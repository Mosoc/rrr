import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkCookie from './checkCookie';

import 'mocha';

const path = '/shopback/me';
const methods: HttpRequestMethod[] = ['GET'];
const cookieRequired = 'sbcookie';

const requestWithCookieRequired: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/me',
  method: 'GET',
  headers: {
    Cookie: `${cookieRequired}=test;`
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

describe('Check Cookie', () => {
  it('passed', () => {
    const origin = requestWithCookieRequired;
    const result = checkCookieByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed', () => {
    const origin = requestWithoutCookieRequired;
    expect(() => checkCookieByExample(origin)).to.throw();
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
