import { expect } from 'chai';
import handleJSON from './json';

import 'mocha';

describe('Test file IO with JSON format', () => {
  it('successful case', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/modified.json';
    expect(() => handleJSON()(inputFilePath, outputFilePath)).to.not.throw();
  });
  it('failed case - empty input file path', () => {
    const inputFilePath = '';
    const outputFilePath = 'test-files/output/modified.json';
    expect(() => handleJSON()(inputFilePath, outputFilePath)).to.throw();
  });
});
