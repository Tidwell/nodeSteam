var assert = require('chai').assert;
var Steam = require('../lib/steam');

describe('Steam instance creator', function() {
  it('constructing with no options should throw', function() {
    assert.throws(function() {
      var q = new Steam();
    });
  });
  it('constructing with a bad API key format should throw', function() {
    assert.throws(function() {
      var q = new Steam({
        apiKey: ['some', 'bad', 'type'],
        format: 'json'
      });
    });
  });
  it('constructing with a bad format should throw', function() {
    assert.throws(function() {
      var q = new Steam({
        apiKey: 'XXX',
        format: 'badformat'
      });
    });
  });
  it('constructing with no format should default to json', function() {
    var q = new Steam({
      apiKey: 'XXX'
    });
    assert.equal(q.format, 'json');
  });
});
