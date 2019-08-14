import { expect } from 'chai';
import { allMethods } from '../constants';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkHostHeader from './checkHostHeader';

import 'mocha';

const methods: HttpRequestMethod[] = allMethods;
const hostname = 'www.shopback.com';

const requestWithCorrectHostHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'GET',
  headers: {
    Host: 'www.shopback.com'
  }
};

const requestWithWrongHostHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'GET',
  headers: {
    Host: 'www.sharpbac.com'
  }
};

const checkHostHeaderByExample = checkHostHeader(methods, hostname);

describe('Check Host Header', () => {
  it('passed with correct host', () => {
    const origin = requestWithCorrectHostHeader;
    const result = checkHostHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed with wrong host', () => {
    const origin = requestWithWrongHostHeader;
    expect(() => checkHostHeaderByExample(origin)).to.throw();
  });
});
