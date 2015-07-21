var assert = require("assert"),
    Label = require('../widget/label'),
    Option = require('../widget/option'),
    Select = require('../widget/select');

describe('Select', function() {
  describe('init', function () {
    it('should render with a single option', function() {
      var option = new Option({value: 'value'}, 'text'),
          select = new Select(option, {name: 'name'}, new Label('Label'));

      assert.equal(select.fields.length, 1);
    });

    it('should render with an array of options', function() {
      var option = new Option({value: 'value'}, 'text'),
          label = new Label({text: 'Label'}),
          select = new Select([option, option], {name: 'name'}, label);

      assert.equal(select.fields.length, 2);
    });

    it('should select the right option, when setting a value', function() {
      var option = new Option({value: 'value'}, 'text'),
          option2 = new Option({value: 'value-two'}, 'text'),
          select = new Select([option, option2], {name: 'name', value: 'value'});

      assert.equal(select.fields.length, 2);
      assert.equal(select.fields[0].attributes.selected, 'selected');
      assert.equal(select.fields[1].attributes.selected, undefined);

      select.value('value-two');
      assert.equal(select.fields[0].attributes.selected, undefined);
      assert.equal(select.fields[1].attributes.selected, 'selected');
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
      var select = new Select(option, {attr: 'something', value: 'value', id: 'testid'}, label);

      var rendered = select.render(),
          expect = '<label attr="Label" for="testid">Label</label>' +
                   '<select attr="something" id="testid">' +
                    '<option value="value" selected="selected">text</option>' +
                   '</select>';

      assert.equal(rendered, expect);
    });
  });

  describe('validate', function() {
    it('should validate its options', function(done) {
      var option = new Option({value: 2}, '1'),
          option2 = new Option({value: 2}, '2'),
          option3 = new Option({value: 0}, '0');

      var select = new Select([option, option2, option3], {name: 'test'});

      select.validate(3).then(function(errors) {
        assert.equal(errors.length, 1);
        assert.equal(select.errors.length, 1);
        assert.equal(select.errors.length, 1);
        assert.equal(select.errors[0].message, 'Please select at least one option');
        done();
      });
    });
  });
});
