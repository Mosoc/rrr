import { expect } from 'chai';
import handleJSON from './json'

import 'mocha';

const inputFilePath = './test-files/source.json';
const outputFilePath = './test-files/output/modified.json';


describe('Add Timestamp', () => {
  it('check timestamp format', () => {
    expect(()=>handleJSON(inputFilePath, outputFilePath)).to.not.throw();
  });

});
