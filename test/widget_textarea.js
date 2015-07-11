var assert = require("assert"),
    Textarea = require('../widget/textarea');

describe('Textarea', function() {
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
