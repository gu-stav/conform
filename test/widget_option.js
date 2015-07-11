var assert = require("assert"),
    Option = require('../widget/option');

describe('Option', function() {
  describe('init', function () {
    var option;

    before(function() {
      option = new Option({attr: 'something', value: 'value'}, 'text');
    });

    it('should set the right attributes', function () {
      assert.equal(option.attributes.attr, 'something');
      assert.equal(option.attributes.value, 'value');
      assert.equal(option.text, 'text');
    });
  });

  describe('render', function () {
    var option;

    before(function() {
      option = new Option({attr: 'something', value: 'value'}, 'text');
    });

    it('should render correct', function () {
      var rendered = option.render(),
          expect = '<option attr="something" value="value">text</option>';

      assert.equal(rendered, expect);
    });
  });
});
