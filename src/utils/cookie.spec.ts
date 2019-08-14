
import { expect } from 'chai';
import {parse} from './cookie'

import 'mocha';

describe('Cookies Utils', () => {
  it('parse cookies', () => {
    expect(parse('a=b')).to.deep.equal({a: 'b'});
  });
});