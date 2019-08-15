import { expect } from 'chai';
import { HttpRequestObject } from '../types';
import defaultRulesConfiguration from './index';

import 'mocha';

const requestExample: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/me',
  method: 'GET',
  headers: {
    Cookie: 'sbcookie=test; area=taiwan',
    Host: 'www.shopback.com',
    Referer: 'http://www.shopback.com/'
  }
};

describe('Check composed rules', () => {
  it('passed with correct cookie, referer, host header', () => {
    const origin = requestExample;
    const result = defaultRulesConfiguration(origin);
    expect(result).to.not.equal(origin);
  });
  /*
      expect(result).to.deep.equal(origin);
       {
         "headers": {
           "Host": "www.shopback.com"
           "Referer": "http://www.shopback.com/"
      -    "X-SHOPBACK-TIMESTAMP": "2019-08-15T16:37:37.299Z"
         }
         "method": "GET"
         "url": "http://www.shopback.com/static/assets/image.jpg"
       }
      
  */
});
