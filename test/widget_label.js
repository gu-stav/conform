var assert = require("assert"),
    Input = require('../widget/input'),
    Label = require('../widget/label');

describe('Label', function() {
  describe('init', function() {
    var label;

    before(function() {
      label = new Label({attr: 'something'}, 'text');
    });

    it('should set the right attributes', function() {
      assert.equal(label.attributes.attr, 'something');
      assert.equal(label.text, 'text');
    });

    it('should provide a shortcut', function() {
      var newLabel = new Label('Something');

      assert.equal(newLabel.text, 'Something');
    });

    it('should set the right for-property', function () {
      var input = new Input({attr: 'something', blubb: 'blubb', id: 'myid'}, label);

      var rendered = input.label.render(),
          expect = '<label attr="something" for="myid">text</label>';

      assert.equal(input.attributes.id, 'myid');
      assert.equal(rendered, expect);
    });
  });

  describe('render', function() {
    var label;

    before(function() {
      label = new Label({attr: 'something'}, 'text');
    });

    it('should render correct', function() {
      var rendered = label.render(),
          expect = '<label attr="something">text</label>';

      assert.equal(rendered, expect);
    });
  });
});
