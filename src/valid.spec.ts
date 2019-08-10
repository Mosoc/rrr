import { expect } from 'chai';
import valid from './valid';

import 'mocha';

describe('Simple validator', () => {
  it('should return true', () => {
    const result = valid('asdfg');
    expect(result).to.true;
  });
});
