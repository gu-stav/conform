var assert = require("assert"),
    Fieldset = require('../widget/fieldset'),
    Input = require('../widget/input'),
    Legend = require('../widget/legend');

describe('Fieldset', function() {
  describe('init', function () {
    it('it should set the attributes', function() {
      var fieldset = new Fieldset([], {attr: 'attr'});
      assert.equal(fieldset.attributes.attr, 'attr');
    });

    it('it should set fields and legend correct', function() {
      var input = new Input({name: 'test'}),
          legend = new Legend('My Legend'),
          fieldset = new Fieldset([input]);

      assert.equal(fieldset.fields.length, 1);

      fieldset = new Fieldset([input, input]);
      assert.equal(fieldset.fields.length, 2);

      fieldset = new Fieldset([input, input], {}, legend);
      assert.equal(fieldset.legend.text, 'My Legend');
    });
  });

  describe('render', function() {
    it('it should render', function() {
      var fieldset = new Fieldset([], {attr: 'attr'}),
          expected = '<fieldset attr="attr"></fieldset>';

      assert.equal(fieldset.render(), expected);

    });

    it('it should render with legend', function() {
      var legend = new Legend('My Legend'),
          fieldset = new Fieldset([], {attr: 'attr'}, legend),
          expected = '<fieldset attr="attr"><legend>My Legend</legend></fieldset>';

      assert.equal(fieldset.render(), expected);
    });

    it('it should render with fields & legend', function() {
      var input = new Input({name: 'test'}),
          legend = new Legend('My Legend'),
          fieldset = new Fieldset([input], {attr: 'attr'}, legend),
          expected = '<fieldset attr="attr">' +
                        '<legend>My Legend</legend>' +
                        '<input type="text" name="test"/>' +
                      '</fieldset>';

      assert.equal(fieldset.render(), expected);
    });
  });
});
