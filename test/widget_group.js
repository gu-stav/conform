var assert = require("assert");
var Group = require('../widget/group');
var Input = require('../widget/input');

describe('Group', function() {
  describe('render', function() {
    it('should render a custom tag', function() {
      var group = new Group('div', [], {class: 'test'}),
          rendered = group.render();

      assert.equal(rendered, '<div class="test"></div>');
    });

    it('should render with children', function() {
      var input = new Input({}),
          group = new Group('div', [input], {class: 'test'}),
          rendered = group.render();

      assert.equal(rendered, '<div class="test"><input type="text"/></div>');
    });
  });
});
