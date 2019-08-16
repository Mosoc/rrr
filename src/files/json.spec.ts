import { expect } from 'chai';
import handleJSON from './json'

import 'mocha';

const inputFilePath = './test-file/source.json';
const outputFilePath = './test-file/output/modified.json';


describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    expect(()=>handleJSON(inputFilePath, outputFilePath)).to.not.throw();
  });

});
