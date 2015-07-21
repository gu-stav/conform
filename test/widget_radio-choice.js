var chai = require('chai'),
    assert = chai.assert,
    Label = require('../widget/label'),
    RadioChoice = require('../widget/radio-choice');

describe('Radio Choice', function() {
  var fields = [
    {
      text: 'Choice 1',
    }, {
      text: 'Choice 2',
    }
  ];

  describe('init', function () {
    it('should render with a single option', function() {
      var radio = new RadioChoice({name: 'bla'}, {text: 'Choice 1'});

      assert.equal(radio.fields.length, 1);
      assert.equal(radio.fields[0].attributes.type, 'radio');
      assert.equal(radio.fields[0].attributes.name, 'bla');
      assert.equal(radio.fields[0].label.text, 'Choice 1');
    });

    it('should render with multiple options', function () {
      var radio = new RadioChoice({name: 'name'}, fields);

      assert.equal(radio.fields.length, 2);
      assert.equal(radio.fields[0].attributes.type, 'radio');
      assert.equal(radio.fields[0].attributes.name, 'name');
      assert.equal(radio.fields[0].label.text, 'Choice 1');

      assert.equal(radio.fields[1].attributes.type, 'radio');
      assert.equal(radio.fields[1].attributes.name, 'name');
      assert.equal(radio.fields[1].label.text, 'Choice 2');
    });
  });

  describe('value', function() {
    it('should set the value on the radio boxes', function() {
      var fields = [
        {
          text: 'Choice 1',
          value: 'choice1',
        }, {
          text: 'Choice 2',
          value: 'choice2',
        }
      ];

      var radio = new RadioChoice({name: 'name', value: 'choice1'}, fields);

      assert.equal(radio.fields[0].attributes.checked, 'checked');
      assert.equal(radio.fields[1].attributes.checked, undefined);

      radio.value('choice2');

      assert.equal(radio.fields[0].attributes.checked, undefined);
      assert.equal(radio.fields[1].attributes.checked, 'checked');
    });
  });

  describe('render', function() {
    var radio;

    before(function() {
      radio = new RadioChoice({name: 'name', id: 'test'}, fields);
    });

    it('should render correct with multiple options', function () {
      var rendered = radio.render(),
          expect = '<input type="radio" name="name" id="test-0"/>' +
                   '<label for="test-0">Choice 1</label>' +
                   '<input type="radio" name="name" id="test-1"/>' +
                   '<label for="test-1">Choice 2</label>';

      assert.equal(rendered, expect);
    });

    it('should handle its IDs', function () {
      var myRadio = new RadioChoice({name: 'name', id: 'test'}, fields);

      var rendered = myRadio.render(),
          expect = '<input type="radio" name="name" id="test-0"/>' +
                   '<label for="test-0">Choice 1</label>' +
                   '<input type="radio" name="name" id="test-1"/>' +
                   '<label for="test-1">Choice 2</label>';

      assert.equal(rendered, expect);

      myRadio = new RadioChoice({name: 'name'}, fields);
      rendered = myRadio.render();

      assert.match(myRadio.fields[0].attr('id'), /el_[0-9]\-[0-9]/);
      assert.match(myRadio.fields[1].attr('id'), /el_[0-9]\-[0-9]/);
      assert.notEqual(myRadio.fields[0].attr('id'), myRadio.fields[1].attr('id'))
    });
  });
});
