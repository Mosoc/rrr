import { expect } from 'chai';
import { allMethods } from '../constants';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import addTimestamp from './addTimestamp';

import 'mocha';

const methods: HttpRequestMethod[] = allMethods;
const timestampName = 'X-SHOPBACK-TIMESTAMP';

const requestWithoutTimestamp: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/resource',
  method: 'GET',
  headers: {}
};

const addTimestampByExample = addTimestamp(methods, timestampName);

describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    const origin = requestWithoutTimestamp;
    const result = addTimestampByExample(origin);
    expect(result.headers.hasOwnProperty(timestampName)).to.be.true;
    expect(result.headers[timestampName]).to.a('string');
  });
});
