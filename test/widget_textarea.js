var assert = require("assert"),
    Textarea = require('../widget/textarea');

describe('Textarea', function() {
  describe('value', function() {
    it('should return the right value', function() {
      var textarea = new Textarea({name: 'something', value: 'Value'});

      assert.equal(textarea.value(), 'Value');
    });

    it('should change the value', function() {
      var textarea = new Textarea({name: 'something', value: 'Value'});

      assert.equal(textarea.value(), 'Value');
      textarea.value('Value 2');
      assert.equal(textarea.value(), 'Value 2');
    });
  });

  describe('render', function() {
    var textarea;

    before(function() {
      textarea = new Textarea({name: 'something', value: 'Value'});
    });

    it('should render correct', function() {
      var rendered = textarea.render(),
          expect = '<textarea name="something">Value</textarea>';

      assert.equal(rendered, expect);
    });
  });
});
