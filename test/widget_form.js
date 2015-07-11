var assert = require("assert"),
    Button = require('../widget/button'),
    Input = require('../widget/input'),
    Form = require('../widget/form'),
    Label = require('../widget/label');

describe('Form', function() {
  describe('init', function() {
    it('should set the right attributes (with defaults)', function() {
      var form = new Form([], [], {});

      assert.equal(form.fields.length, 0);
      assert.equal(form.buttons.length, 0);
      assert.equal(form.attributes.action, '');
      assert.equal(form.attributes.method, 'post');
    });

    it('should set the right attributes (without defaults)', function() {
      var form = new Form([], [], {method: 'get', attr: 'test'});

      assert.equal(form.attributes.action, '');
      assert.equal(form.attributes.attr, 'test');
      assert.equal(form.attributes.method, 'get');
    });
  });

  describe('render', function() {
    it('should render correct without fields and buttons', function() {
      var form = new Form([], [], {}),
          rendered = form.render(),
          expect = '<form method="post" action=""></form>';

      assert.equal(rendered, expect);
    });

    it('should render correct without fields but buttons', function() {
      var button = new Button('Submit'),
          form = new Form([], [button], {}),
          rendered = form.render(),
          expect = '<form method="post" action=""><div><button type="submit">Submit</button></div></form>';

      assert.equal(rendered, expect);
    });

    it('should render correct with fields but without buttons', function() {
      var label = new Label('My Label'),
          input = new Input({}, label),
          form = new Form([input], [], {}),
          rendered = form.render(),
          expect = '<form method="post" action=""><div><label>My Label</label><input type="text"/></div></form>';

      assert.equal(rendered, expect);
    });
  });
});
