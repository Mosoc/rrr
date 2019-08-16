import { expect } from 'chai';
import handleYAML from './yaml'

import 'mocha';

const inputFilePath = './test-files/source.yaml';
const outputFilePath = './test-files/output/modified.yaml';


describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    expect(()=>handleYAML(inputFilePath, outputFilePath)).to.not.throw();
  });

});
