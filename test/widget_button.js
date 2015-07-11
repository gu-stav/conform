var assert = require("assert"),
    Button = require('../widget/button');

describe('Button', function() {
  describe('init', function() {
    it('should set the right attributes (with defaults)', function() {
      var button = new Button({name: 'something'}, 'text');

      assert.equal(button.attributes.name, 'something');
      assert.equal(button.attributes.type, 'submit');
      assert.equal(button.text, 'text');
    });

    it('should set the right attributes (without defaults)', function() {
      var button = new Button({name: 'something', type: 'button'}, 'text');

      assert.equal(button.attributes.name, 'something');
      assert.equal(button.attributes.type, 'button');
      assert.equal(button.text, 'text');
    });

    it('should provide a shortcut, where only text is passed in', function() {
      var button = new Button('text');

      assert.equal(button.attributes.type, 'submit');
      assert.equal(button.text, 'text');
    });
  });

  describe('render', function() {
    var button;

    before(function() {
      button = new Button({name: 'something'}, 'text');
    });

    it('should render correct', function() {
      var rendered = button.render(),
          expect = '<button type="submit" name="something">text</button>';

      assert.equal(rendered, expect);
    });
  });
});
