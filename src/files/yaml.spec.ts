import { expect } from 'chai';
import handleYAML from './yaml'

import 'mocha';

const inputFilePath = './test-file/source.yaml';
const outputFilePath = './test-file/output/modified.yaml';


describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    expect(()=>handleYAML(inputFilePath, outputFilePath)).to.not.throw();
  });

});
