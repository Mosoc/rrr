import { expect } from 'chai';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import modifyPath from './modifyPath';

import 'mocha';

const methods:HttpRequestMethod[] = ['GET'];
const selectedPath = '/shopback/resource';
const distinationPath = '/shopback/static/assets';

const requestWithMathedPath: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/resource',
  method: 'GET',
  headers: {}
};

const requestWithUnmathedPath: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/user',
  method: 'GET',
  headers: {}
};

const requestWithMathedPathButDifferentMethod: HttpRequestObject = {
  url: 'http://www.shopback.com/shopback/resource',
  method: 'POST',
  headers: {}
};

const modifyPathByExample = modifyPath(methods, selectedPath, distinationPath);

describe('Modify Path', () => {
  it('should modify the path', () => {
    const origin = requestWithMathedPath;
    const result = modifyPathByExample(origin);
    const url = new URL(result.url);
    expect(url.pathname).to.equal(distinationPath);
  });

  it('should bypass the object with unmatched path', () => {
    const origin = requestWithUnmathedPath;
    const result = modifyPathByExample(origin);
    expect(result).to.deep.equal(origin);
  });

  it('should the object when using different', () => {
    const origin = requestWithMathedPathButDifferentMethod;
    const result = modifyPathByExample(origin);
    expect(result).to.deep.equal(origin);
  });
});
