import { expect } from 'chai';
import handleXML from './xml';

import 'mocha';

describe('Test file IO with XML format', () => {
  it('successful case', () => {
    const inputFilePath = 'test-files/source.xml';
    const outputFilePath = 'test-files/output/modified.xml';
    expect(() => handleXML()(inputFilePath, outputFilePath)).to.not.throw();
  });

  it('successful case - different root', () => {
    const inputFilePath = 'test-files/source-different-root.xml';
    const outputFilePath = 'test-files/output/modified-different-root.xml';
    expect(() => handleXML()(inputFilePath, outputFilePath)).to.not.throw();
  });

  it('failed case - empty input file path', () => {
    const inputFilePath = '';
    const outputFilePath = 'test-files/output/modified.xml';
    expect(() => handleXML()(inputFilePath, outputFilePath)).to.throw();
  });
});
