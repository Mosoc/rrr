import { expect } from 'chai';
import handleXML from './xml';

import 'mocha';

const inputFilePath = 'test-files/source.xml';
const outputFilePath = 'test-files/output/modified.xml';

describe('Test file IO with XML format', () => {
  it('successful case', () => {
    expect(() => handleXML()(inputFilePath, outputFilePath)).to.not.throw();
  });
});
