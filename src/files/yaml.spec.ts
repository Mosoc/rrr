import { expect } from 'chai';
import handleYAML from './yaml';

import 'mocha';

const inputFilePath = 'test-files/source.yaml';
const outputFilePath = 'test-files/output/modified.yaml';

describe('Test file IO with YAML format', () => {
  it('successful case', () => {
    expect(() => handleYAML(inputFilePath, outputFilePath)).to.not.throw();
  });
});
