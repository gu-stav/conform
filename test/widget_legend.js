var assert = require("assert"),
    Input = require('../widget/input'),
    Legend = require('../widget/legend');

describe('Legend', function() {
  describe('init', function() {
    var legend;

    before(function() {
      legend = new Legend({attr: 'something'}, 'text');
    });

    it('should set the right attributes', function() {
      assert.equal(legend.attributes.attr, 'something');
      assert.equal(legend.text, 'text');
    });

    it('should provide a shortcut', function() {
      var newLegend = new Legend('Something');

      assert.equal(newLegend.text, 'Something');
    });
  });

  describe('render', function() {
    var legend;

    before(function() {
      legend = new Legend({attr: 'something'}, 'text');
    });

    it('should render correct', function() {
      var rendered = legend.render(),
          expect = '<legend attr="something">text</legend>';

      assert.equal(rendered, expect);
    });
  });
});
