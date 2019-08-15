import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkCookie from './checkCookie';

import 'mocha';

const path = '/shopback/me';
const methods: HttpRequestMethod[] = ['GET'];
const cookieRequired = 'sbcookie';
const value = 'test';

const requestWithCookieRequired: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/me',
  method: 'GET',
  headers: {
    Cookie: `${cookieRequired}=test`
  }
};

const requestWithCookieRequiredButIncorrectValue: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/me',
  method: 'GET',
  headers: {
    Cookie: `${cookieRequired}=stage`
  }
};

const requestWithoutCookieRequired: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/me',
  method: 'GET',
  headers: {
    Cookie: `area=taiwan;`
  }
};

const requestWithUnmathedPath: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/user',
  method: 'GET',
  headers: {}
};

const requestWithMathedPathButDifferentMethod: HttpRequestObject = {
  url: 'http://www.shopback.com/me',
  method: 'POST',
  headers: {}
};

const checkCookieByExample = checkCookie(methods, path, cookieRequired);
const checkCookieByExampleWithSpecificValue = checkCookie(
  methods,
  path,
  cookieRequired,
  value
);

describe('Check Cookie', () => {
  it('passed with required cookie', () => {
    const origin = requestWithCookieRequired;
    const result = checkCookieByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed without required cookie', () => {
    const origin = requestWithoutCookieRequired;
    expect(() => checkCookieByExample(origin)).to.throw();
  });

  it('passed with required cookie and correct value', () => {
    const origin = requestWithCookieRequired;
    const result = checkCookieByExampleWithSpecificValue(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed with required cookie but incorrect value', () => {
    const origin = requestWithCookieRequiredButIncorrectValue;
    expect(() => checkCookieByExampleWithSpecificValue(origin)).to.throw();
  });

  it('should bypass the object with unmatched path', () => {
    const origin = requestWithUnmathedPath;
    const result = checkCookieByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('should bypass the object when using different method', () => {
    const origin = requestWithMathedPathButDifferentMethod;
    const result = checkCookieByExample(origin);
    expect(result).to.deep.equal(origin);
  });
});
