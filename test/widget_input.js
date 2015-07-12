var assert = require("assert");
var Input = require('../widget/input');
var Label = require('../widget/label');
var Promise = require('bluebird');
var ValidationError = require('../lib/error').ValidationError;

describe('Input', function() {
  describe('init', function () {
    var input,
        label;

    before(function() {
      label = new Label({}, 'Label');
      input = new Input({attr: 'something', blubb: 'blubb', id: 'myid'}, label);
    });

    it('should set the right attributes', function () {
      assert.equal(input.attributes.attr, 'something');
      assert.equal(input.attributes.blubb, 'blubb');
    });
  });

  describe('render', function() {
    it('should render correct without label', function() {
      var input = new Input({attr: 'something'}),
          rendered = input.render(),
          expect = '<input type="text" attr="something"/>';

      assert.equal(rendered, expect);
    });

    it('should render correct with label', function() {
      var label = new Label({}, 'Label'),
          input = new Input({attr: 'something'}, label),
          rendered = input.render(),
          expect = '<label>Label</label><input type="text" attr="something"/>';

      assert.equal(rendered, expect);
    });
  });

  describe('validate', function() {
    it('should not catch valid values', function(done) {
      var input = new Input({type: 'text'});

      input.validator({
        shouldNotBe2: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Value should not equals 2');
            } else {
              resolve();
            }
          });
        },
      });

      input.validate(3).then(function(errors) {
        assert.equal(errors, undefined);
        assert.equal(input.isValid(), true);
        done();
      });
    });

    it('should catch errors thrown into validator function', function(done) {
      var input = new Input({type: 'text'});

      input.validator({
        shouldNotBe2: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Value should not equals 2');
            } else {
              resolve();
            }
          });
        },
      });

      input.validate(2).then(function(errors) {
        assert.equal(errors.length, 1);
        assert.equal(input.errors.length, 1);
        assert.ok(input.errors[0] instanceof ValidationError);
        assert.equal(input.errors[0].message, 'Value should not equals 2');
        assert.equal(input.isValid(), false);
        done();
      });
    });

    it('should catch multiple errors', function(done) {
      var input = new Input({type: 'text'});

      input.validator({
        shouldNotBe2: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Value should not equals 2');
            } else {
              resolve();
            }
          });
        },
        shouldNotBe2or3: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 3 || value === 2) {
              throw new Error('Value should not equals 2 or 3');
            } else {
              resolve();
            }
          });
        },
      });

      input.validate(2).then(function(errors) {
        assert.equal(errors.length, 2);
        assert.equal(input.errors.length, 2);
        assert.ok(input.errors[0] instanceof ValidationError);
        assert.ok(input.errors[1] instanceof ValidationError);
        assert.equal(input.errors[0].message, 'Value should not equals 2');
        assert.equal(input.errors[1].message, 'Value should not equals 2 or 3');
        assert.equal(input.isValid(), false);
        done();
      });
    });

    it('should render errors after validation', function(done) {
      var input = new Input({type: 'text'});

      input.validator({
        shouldNotBe2: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Value should not equals 2');
            } else {
              resolve();
            }
          });
        },
        shouldNotBe2or3: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 3 || value === 2) {
              throw new Error('Value should not equals 2 or 3');
            } else {
              resolve();
            }
          });
        },
      });

      input.validate(2).then(function(errors) {
        var expect = '<input type="text"/>' +
                     '<span class="form_error">Value should not equals 2</span>' +
                     '<span class="form_error">Value should not equals 2 or 3</span>';
        input = input.render();

        assert.equal(input, expect);
        done();
      });
    });

    it('should restore its state after beeing valid again', function(done) {
      var input = new Input({type: 'text'});

      input.validator({
        shouldNotBe2: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 2) {
              throw new Error('Value should not equals 2');
            } else {
              resolve();
            }
          });
        },
        shouldNotBe2or3: function(value) {
          return new Promise(function(resolve, reject) {
            if(value === 3 || value === 2) {
              throw new Error('Value should not equals 2 or 3');
            } else {
              resolve();
            }
          });
        }
      });

      input.validate(2).then(function(errors) {
        input.validate(4).then(function(errors) {
          assert.equal(errors, undefined);

          var rendered = input.render(),
              expect = '<input type="text"/>';

          assert.equal(rendered, expect);
          done();
        });
      });
    });
  });

  describe('validate + render', function() {
    it('should render error messages', function(done) {
      var input = new Input();

      input.validator({
        notEmpty: function(value) {
          return new Promise(function(resolve, reject) {
            if(value.length === 0) {
              throw new Error('Is empty');
            } else {
              resolve();
            }
          });
        },
      });

      input
        .validate('')
        .then(function(errors) {
          var rendered = input.render(),
              expected = '<input type="text"/>' +
                         '<span class="form_error">Is empty</span>';

          assert.equal(rendered, expected);
          done();
        });
    });
  });
});
