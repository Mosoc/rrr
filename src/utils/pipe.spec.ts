import { expect } from 'chai';
import pipe from './pipe';

import 'mocha';

describe('Functional pipeline', () => {
  it('composes functions', () => {
    const fn1 = (val: string) => `fn1(${val})`;
    const fn2 = (val: string) => `fn2(${val})`;
    const fn3 = (val: string) => `fn3(${val})`;
    const composedFunction = pipe(
      fn1,
      fn2,
      fn3
    );
    expect(composedFunction('inner'))
      .to.be.equal(fn3(fn2(fn1('inner'))))
      .and.to.be.equal('fn3(fn2(fn1(inner)))');
  });
});
