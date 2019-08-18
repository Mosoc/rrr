import { allMethods as ALL } from '../constants';
import { HttpRequestMethod, HttpRequestObject, RuleSet } from '../types';
import compose from '../utils/compose';
import pipe from '../utils/pipe';

import addFromHeader from './addFromHeader';
import addTimestamp from './addTimestamp';
import checkContentTypeHeader from './checkContentTypeHeader';
import checkCookie from './checkCookie';
import checkCustomHeader from './checkCustomHeader';
import checkHostHeader from './checkHostHeader';
import checkRefererHeader from './checkRefererHeader';
import modifyPath from './modifyPath';
import removeQueryString from './removeQueryString';

const GET: HttpRequestMethod[] = ['GET'];
const POST_AND_PUT: HttpRequestMethod[] = ['POST', 'PUT'];
const DELETE: HttpRequestMethod[] = ['DELETE'];

const hostname = 'www.shopback.com';

// Do nothing but return the original value, use for edge case:
// Get the ruleSet = []
const noop = (input: HttpRequestObject) => input;

const defaultRuleSet: RuleSet = [
  // GET Method
  modifyPath(GET, '/shopback/resource', '/shopback/static/assets'), // Rule #1
  checkCookie(GET, '/shopback/me', 'sbcookie'), // Rule #2
  checkRefererHeader(GET, hostname), // Rule #3
  addFromHeader(GET, '/shopback/api/*', 'hello@shopback.com', true), // Rule #4
  // POST/PUT Methods
  removeQueryString(POST_AND_PUT),
  checkCustomHeader(POST_AND_PUT, 'X-SHOPBACK-AGENT'), // #6
  checkContentTypeHeader(POST_AND_PUT, 'application/json'), // #7
  // DELETE Methods
  checkCustomHeader(DELETE, 'X-SHOPBACK-AGENT', 'AGENT_1'), // #8
  // All Methods
  addTimestamp(ALL, 'X-SHOPBACK-TIMESTAMP', true), // Rule #9
  checkHostHeader(ALL, hostname) // Rule #10
];

const defaultRules = (input: HttpRequestObject): HttpRequestObject => {
  // I used "compose" function because I thought the rules priority order is 10 to 1.
  // but using pipe as default seems more intuitive

  const composedRules = pipe<[HttpRequestObject], HttpRequestObject>(
    noop,
    ...defaultRuleSet
  );
  // const composedRules = compose<HttpRequestObject>(noop, ...ruleSet);
  return composedRules(input);
};

const rulesConfiguration = (ruleSet?: RuleSet, reversed: boolean = false) => (
  input: HttpRequestObject
) => {
  if (!ruleSet) {
    return defaultRules(input);
  }

  const customRules = reversed
    ? compose<HttpRequestObject>(
        noop,
        ...ruleSet
      )
    : pipe<[HttpRequestObject], HttpRequestObject>(
        noop,
        ...ruleSet
      );
  return customRules(input);
};

export default rulesConfiguration;
export {
  addFromHeader,
  addTimestamp,
  checkContentTypeHeader,
  checkCustomHeader,
  checkHostHeader,
  checkRefererHeader,
  modifyPath,
  removeQueryString
};

export { defaultRuleSet };
