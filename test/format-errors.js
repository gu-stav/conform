const assert = require('assert');
const formatErrors = require('../lib/format-errors');

describe('Format Errors', function() {
  it('should flatten the given array', function() {
    var data = [
      '1',
      [
        '2'
      ],
    ];

    errors = formatErrors(data);

    assert.equal(errors[0], '1');
    assert.equal(errors[1], '2');
  });

  it('should remove falsy values', function() {
    var data = [
      undefined,
      '1',
      'undefined',
      false,
    ];

    errors = formatErrors(data);

    assert.equal(errors.length, 2);
    assert.equal(errors[0], '1');
    assert.equal(errors[1], 'undefined');
  });
});
