import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import removeQueryString from './removeQueryString';

import 'mocha';

const methods: HttpRequestMethod[] = ['PUT', 'POST'];

const requestWithQueryString: HttpRequestObject = {
  url: 'http://www.shopback.com/post?a=123',
  method: 'POST',
  headers: {}
};

const requestWithoutQueryString: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/post',
  method: 'POST',
  headers: {}
};

describe('Remove Query string ', () => {
  it('with query string', () => {
    const origin = requestWithQueryString;
    const result = removeQueryString(methods)(origin);
    const url = new URL(result.url);
    expect(url.search).to.be.empty;
  });

  it('without query string', () => {
    const origin = requestWithoutQueryString;
    const result = removeQueryString(methods)(origin);
    expect(result).to.deep.equal(origin);
  });
});
