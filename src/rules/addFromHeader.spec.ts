import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import addFromHeader from './addFromHeader';

import 'mocha';

const methods: HttpRequestMethod[] = ['GET'];
const path = '/shopback/api/*';
const value = 'hello@shopback.com';

const requestWithMathedPath: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/api/abc',
  method: 'GET',
  headers: {}
};

const requestWithUnmathedPath: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/ipa',
  method: 'GET',
  headers: {}
};

const requestWithMathedPathButDifferentMethod: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/api/abc',
  method: 'POST',
  headers: {}
};

const addFromHeaderByExample = addFromHeader(methods, path, value);

const checkFromHeaderFormat = (fromValue: any) => {
  const emailReg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Only fit RFC 5322
  if (fromValue && typeof fromValue === 'string') {
    if (!emailReg.test(fromValue)) {
      throw new TypeError('From header should be an email string.');
    }
  } else {
    throw new TypeError('From header should be an email string.');
  }
};

describe('Add From Header', () => {
  it('check form header format', () => {
    const origin = requestWithMathedPath;
    const result = addFromHeaderByExample(origin);
    expect(result.headers.hasOwnProperty('From')).to.be.true;
    expect(result.headers.From).to.a('string');
    expect(() =>
      checkFromHeaderFormat(result.headers.From)
    ).to.not.throw();
  });

  it('should bypass the object with unmatched path', () => {
    const origin = requestWithUnmathedPath;
    const result = addFromHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('should bypass the object when using different method', () => {
    const origin = requestWithMathedPathButDifferentMethod;
    const result = addFromHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });
});
