const assert = require('assert');
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
});
