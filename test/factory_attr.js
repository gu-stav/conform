const assert = require('assert');
const Factory = require('../lib/factory');

describe('Factory.attr()', function() {
  it('should merge attributes, when passing an object', function() {
    var factory = new Factory();

    factory.attr({
      'test': 1,
      'bla': null,
      'something': 'test',
    });

    assert.equal(factory.attr('test'), 1);
    assert.equal(factory.attr('bla'), null);
    assert.equal(factory.attr('something'), 'test');

    factory.attr({
      'test': 2,
    });

    assert.equal(factory.attr('test'), 2);
  });

  it('should set, when passing in a key value pair', function() {
    var factory = new Factory();

    factory.attr('my', 'test');
    assert.equal(factory.attr('my'), 'test');

    factory.attr('my', 'new test');
    assert.equal(factory.attr('my'), 'new test');
  });

  it('should allow setting values to undefined and null', function() {
    var factory = new Factory();

    factory.attr('my', 'test');
    assert.equal(factory.attr('my'), 'test');

    factory.attr('my', null);
    assert.equal(factory.attr('my'), null);

    factory.attr('my', undefined);
    assert.equal(factory.attr('my'), undefined);

    factory.attr('my', 'null');
    assert.equal(factory.attr('my'), 'null');
  });

  it('should return values, with only one argument which is a string', function() {
    var factory = new Factory();

    factory.attr('my', 'test');
    assert.equal(factory.attr('my'), 'test');
  });

  it('should not set an empty object, when just calling the function', function() {
    var factory = new Factory();

    assert.equal(factory.attr(), undefined);
    assert.equal(factory.attributes, undefined);
  });

  it('should return the full attributes object', function() {
    var factory = new Factory(),
        data = {
          'test': 1,
          'something': null,
          'test': 3,
        };

    factory.attr(data);
    assert.deepEqual(factory.attr(), data);
  });
});
