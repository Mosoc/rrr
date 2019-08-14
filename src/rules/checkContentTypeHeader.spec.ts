import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkContentTypeHeader from './checkContentTypeHeader';

import 'mocha';

const methods: HttpRequestMethod[] = ['POST', 'PUT'];
const contentType = 'application/json';

const requestWithCorrectContentTypeHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/post',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const requestWithWrongContentTypeHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/post',
  method: 'POST',
  headers: {
    'Content-Type': 'text/html; charset=utf-8'
  }
};

const requestWithWrongContentTypeHeaderAndDifferentMethod: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'GET',
  headers: {
    'Content-Type': 'text/html; charset=utf-8'
  }
};

const checkContentTypeHeaderByExample = checkContentTypeHeader(
  methods,
  contentType
);

describe('Check ContentType Header', () => {
  it('passed with correct ContentType', () => {
    const origin = requestWithCorrectContentTypeHeader;
    const result = checkContentTypeHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed with wrong ContentType', () => {
    const origin = requestWithWrongContentTypeHeader;
    expect(() => checkContentTypeHeaderByExample(origin)).to.throw();
  });

  it('should bypass the object when using different method', () => {
    const origin = requestWithWrongContentTypeHeaderAndDifferentMethod;
    const result = checkContentTypeHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });
});
