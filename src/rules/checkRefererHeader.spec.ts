import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkRefererHeader from './checkRefererHeader';

import 'mocha';

const methods: HttpRequestMethod[] = ['GET'];
const hostname = 'www.shopback.com';

const requestWithCorrectRefererHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'GET',
  headers: {
    Referer: 'http://www.shopback.com/'
  }
};

const requestWithWrongRefererHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'GET',
  headers: {
    Referer: 'http://www.sharpbac.com/'
  }
};

const requestWithWrongRefererHeaderAndDifferentMethod: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'POST',
  headers: {
    Referer: 'http://www.sharpbac.com/'
  }
};

const checkRefererHeaderByExample = checkRefererHeader(methods, hostname);

describe('Check Referer Header', () => {
  it('passed with correct referer', () => {
    const origin = requestWithCorrectRefererHeader;
    const result = checkRefererHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed with wrong referer', () => {
    const origin = requestWithWrongRefererHeader;
    expect(() => checkRefererHeaderByExample(origin)).to.throw();
  });

  it('should bypass the object when using different method', () => {
    const origin = requestWithWrongRefererHeaderAndDifferentMethod;
    const result = checkRefererHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });
});
