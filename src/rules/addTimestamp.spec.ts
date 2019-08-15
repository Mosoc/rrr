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

const requestWithTimestamp: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/resource',
  method: 'GET',
  headers: {
    'X-SHOPBACK-TIMESTAMP': '2019-08-15T12:17:41.731Z'
  }
};

const addTimestampByExample = addTimestamp(methods, timestampName);
const addTimestampByExampleWithOverwrite = addTimestamp(
  methods,
  timestampName,
  true
);
const checkTimestampFormat = (timestamp: any) => {
  if (timestamp && typeof timestamp === 'string') {
    // except timestamp === ''
    const ISO8601: RegExp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
    // https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetimes
    if (!ISO8601.test(timestamp)) {
      throw new TypeError('Timestamp should use ISO-8601:2004.');
    }
  } else {
    throw new TypeError('Timestamp should be string.');
  }
};

describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    const origin = requestWithoutTimestamp;
    const result = addTimestampByExample(origin);
    expect(result.headers.hasOwnProperty(timestampName)).to.be.true;
    expect(result.headers[timestampName]).to.a('string');
    expect(() =>
      checkTimestampFormat(result.headers[timestampName])
    ).to.not.throw();
  });

  it('exist timestamp without overwrite', () => {
    const origin = requestWithTimestamp;
    const result = addTimestampByExample(origin);
    expect(result.headers.hasOwnProperty(timestampName)).to.be.true;
    expect(result.headers[timestampName]).to.a('string');
    expect(() =>
      checkTimestampFormat(result.headers[timestampName])
    ).to.not.throw();
    expect(result).to.deep.equal(origin);
  });

  it('exist timestamp without overwrite', () => {
    const origin = requestWithTimestamp;
    const result = addTimestampByExampleWithOverwrite(origin);
    expect(result.headers.hasOwnProperty(timestampName)).to.be.true;
    expect(result.headers[timestampName]).to.a('string');
    expect(() =>
      checkTimestampFormat(result.headers[timestampName])
    ).to.not.throw();
    expect(result).to.not.equal(origin);
  });
});
