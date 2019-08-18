import { expect } from 'chai';
import { requestObjectTemplate } from '../constants';
import { HttpRequestObject } from '../types';
import isHttpRequestObject from './isHttpRequestObject';

import 'mocha';

describe('Check whether data is valid', () => {
  it('successful case', () => {
    const input = requestObjectTemplate;
    const result = isHttpRequestObject(input);
    expect(() => isHttpRequestObject(input)).to.not.throw();
    expect(result).to.be.true;
  });
  it('failed case - empty object', () => {
    const input = {};
    const result = isHttpRequestObject(input);
    expect(() => isHttpRequestObject(input)).to.not.throw();
    expect(result).to.be.false;
  });

  it('failed case - wrong method name', () => {
    const input = {
      header: {},
      method: 'GUT',
      url: 'http://exmaple.com'
    };
    const result = isHttpRequestObject(input);
    expect(() => isHttpRequestObject(input)).to.not.throw();
    expect(result).to.be.false;
  });

  it('failed case - wrong url format', () => {
    const input: HttpRequestObject = {
      url: 'failed.case',
      method: 'GET',
      headers: {}
    };
    expect(() => isHttpRequestObject(input)).to.throw();
  });
});
