import { allMethods } from '../constants';
import { HttpRequestObject } from '../types';

const isHttpRequestObject = (input: object): input is HttpRequestObject => {
  return (
    input.hasOwnProperty('url') &&
    new URL((input as HttpRequestObject).url) &&
    input.hasOwnProperty('method') &&
    allMethods.includes((input as HttpRequestObject).method) &&
    input.hasOwnProperty('headers')
  );
};

export default isHttpRequestObject;
