const assert = require('assert');
const Input = require('../widget/input');
const Promise = require('bluebird');
const ValidationError = require('../lib/error').ValidationError;

describe('Validation Error', function() {
  it('should set the correct message', function() {
    var error = new ValidationError('My message');

    assert.equal(error.message, 'My message');
    assert.equal(error.name, 'ValidationError');
  });

  it('should report its class', function() {
    var error = new ValidationError('Test');

    assert.ok(error instanceof ValidationError);
    assert.ok(error instanceof Error);
  });

  it('should keep the field', function() {
    var input = new Input({
      name: 'test',
      id: 'someid',
    });

    input.validation({
      notEmpty: function(val) {
        return new Promise(function(resolve, reject) {
          if(!val) {
            throw new Error('Field was empty');
          }
        });
      },
    });

    input.validate(null).then(function(errors) {
      assert.equal(errors.length, 1);
      assert.equal(errors[0].message, 'Field was empty');
      assert.equal(errors[0].field.attr('name'), 'test');
      assert.equal(errors[0].field.attr('id'), 'someid');
    });
  });
});
