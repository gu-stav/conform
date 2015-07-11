var assert = require("assert"),
    Label = require('../widget/label'),
    RadioChoice = require('../widget/radio-choice');

describe('Radio Choice', function() {
  var choices = [
    {
      text: 'Choice 1',
    }, {
      text: 'Choice 2',
    }
  ];

  describe('init', function () {
    it('should render with a single option', function () {
      var radio = new RadioChoice('bla', {text: 'Choice 1'});

      assert.equal(radio.choices.length, 1);
      assert.equal(radio.choices[0].attributes.type, 'radio');
      assert.equal(radio.choices[0].attributes.name, 'bla');
      assert.equal(radio.choices[0].label.text, 'Choice 1');
    });
  });

  describe('init', function () {
    it('should render with multiple options', function () {
      var radio = new RadioChoice('name', choices);

      assert.equal(radio.choices.length, 2);
      assert.equal(radio.choices[0].attributes.type, 'radio');
      assert.equal(radio.choices[0].attributes.name, 'name');
      assert.equal(radio.choices[0].label.text, 'Choice 1');

      assert.equal(radio.choices[1].attributes.type, 'radio');
      assert.equal(radio.choices[1].attributes.name, 'name');
      assert.equal(radio.choices[1].label.text, 'Choice 2');
    });
  });

  describe('render', function () {
    var radio;

    before(function() {
      radio = new RadioChoice('name', choices);
    });

    it('should render correct with multiple options', function () {
      var rendered = radio.render(),
          expect = '<input type="radio" name="name"/>' +
                   '<label>Choice 1</label>' +
                   '<input type="radio" name="name"/>' +
                   '<label>Choice 2</label>';

      assert.equal(rendered, expect);
    });
  });
});
