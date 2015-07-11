var assert = require("assert"),
    Label = require('../widget/label'),
    Option = require('../widget/option'),
    Select = require('../widget/select');

describe('Select', function() {
  describe('init', function () {
    it('should render with a single option', function () {
      var option = new Option({value: 'value'}, 'text'),
          select = new Select(option, {name: 'name'}, 'label-text');

      assert.equal(select.options.length, 1);
    });

    it('should render with an array of options', function () {
      var option = new Option({value: 'value'}, 'text'),
          label = new Label({text: 'Label'}),
          select = new Select([option, option], {name: 'name'}, label);

      assert.equal(select.options.length, 2);
    });
  });

  describe('render', function () {
    var option,
        label;

    before(function() {
      option = new Option({value: 'value'}, 'text');
      label = new Label({attr: 'Label'}, 'Label');
    });

    it('should render correct with a single option', function () {
      var select = new Select(option, {attr: 'something', value: 'value'}, label);

      var rendered = select.render(),
          expect = '<label attr="Label">Label</label>' +
                   '<select attr="something" value="value">' +
                    '<option value="value">text</option>' +
                   '</select>';

      assert.equal(rendered, expect);
    });
  });
});
