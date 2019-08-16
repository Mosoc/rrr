import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import checkCustomHeader from './checkCustomHeader';

import 'mocha';

const methods: HttpRequestMethod[] = ['POST', 'PUT'];
const customHeaderName = 'X-SHOPBACK-AGENT';
const deleteMethod: HttpRequestMethod[] = ['DELETE'];
const value = 'AGENT_1';

const requestWithCustomHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'POST',
  headers: {
    [customHeaderName]: value
  }
};

const requestWithoutCustomHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'POST',
  headers: {}
};

const requestWithCorrectCustomHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'DELETE',
  headers: {
    [customHeaderName]: value
  }
};

const requestWithWrongCustomHeader: HttpRequestObject = {
  url: 'http://www.shopback.com/static/assets/image.jpg',
  method: 'DELETE',
  headers: {
    [customHeaderName]: 'AGENT_2'
  }
};

const checkCustomHeaderByExample = checkCustomHeader(methods, customHeaderName);
const checkCustomHeaderByExampleWithSpecificValue = checkCustomHeader(
  deleteMethod,
  customHeaderName,
  value
);

describe('Check Custom Header', () => {
  it('passed with custom header', () => {
    const origin = requestWithCustomHeader;
    const result = checkCustomHeaderByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed without custom header', () => {
    const origin = requestWithoutCustomHeader;
    // const result = checkCustomHeaderByExample(origin);
    // expect(result).to.deep.equal(origin);
    expect(() => checkCustomHeaderByExample(origin)).to.throw();
  });

  it('passed with correct custom header', () => {
    const origin = requestWithCorrectCustomHeader;
    const result = checkCustomHeaderByExampleWithSpecificValue(origin);
    expect(result).to.deep.equal(origin);
  });

  it('failed with incorrect custom header', () => {
    const origin = requestWithWrongCustomHeader;
    expect(() =>
      checkCustomHeaderByExampleWithSpecificValue(origin)
    ).to.throw();
  });
});
