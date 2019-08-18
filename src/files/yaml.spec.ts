import { expect } from 'chai';
import handleYAML from './yaml';

import 'mocha';

describe('Test file IO with YAML format', () => {
  it('successful case', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/modified.yaml';
    expect(() => handleYAML()(inputFilePath, outputFilePath)).to.not.throw();
  });

  it('failed case - empty input file path', () => {
    const inputFilePath = '';
    const outputFilePath = 'test-files/output/modified.yaml';
    expect(() => handleYAML()(inputFilePath, outputFilePath)).to.throw();
  });
});
