var assert = require("assert"),
    Button = require('../widget/button'),
    Input = require('../widget/input'),
    Form = require('../widget/form'),
    Label = require('../widget/label'),
    Promise = require('bluebird');

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

  describe('validate', function() {
    it('should validate all fields and return the errors', function(done) {
      var input = new Input({name: 'test', value: 2}),
          input2 = new Input({name: 'test2', value: 3}),
          form;

      input.validators = {
        notTwo: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Should not equals 2');
            } else {
              resolve();
            }
          });
        },
      };

      input2.validators = {
        notThree: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 3) {
              throw new Error('Should not equals 3');
            } else {
              resolve();
            }
          });
        },
      };

      form = new Form([input, input2], [], {});
      form
        .validate({test: 2, test2: 3})
        .then(function(errors) {
          assert.equal(errors.length, 2);
          assert.equal(errors[0].message, 'Should not equals 2');
          assert.equal(errors[1].message, 'Should not equals 3');
          done();
        });
    });
  });
});
