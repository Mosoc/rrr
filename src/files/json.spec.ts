import { expect } from 'chai';
import handleJSON from './json'

import 'mocha';

const inputFilePath = './test-files/source.json';
const outputFilePath = './test-files/output/modified.json';


describe('Test file IO with JSON format', () => {
  it('successful case', () => {
    expect(()=>handleJSON(inputFilePath, outputFilePath)).to.not.throw();
  });

});
