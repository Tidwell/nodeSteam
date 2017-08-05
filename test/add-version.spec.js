var expect = require('chai').expect;
const Steam = require('../lib/steam');
const s = new Steam({
  apiKey: '123'
});

describe('addVersion', () => {
  it('should append the defaultVersion if no apiVersion is passed', () => {
    const obj = {
      path: 'some-path/for-the-api/'
    };
    s.addVersion(obj, '123');

    expect(obj.path).to.equal('some-path/for-the-api/123/?');
  });

  it('should append the passed apiVersion', () => {
    const obj = {
      path: 'some-path/for-the-api/',
      apiVersion: 456
    };
    s.addVersion(obj, '123');

    expect(obj.path).to.equal('some-path/for-the-api/456/?');
  });

  it('should delete the apiVersion if passed', () => {
    const obj = {
      path: 'some-path/for-the-api/',
      apiVersion: 456
    };
    s.addVersion(obj, '123');

    expect(obj.apiVersion).to.equal(undefined);
  });
});
