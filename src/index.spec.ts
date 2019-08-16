import { expect } from 'chai';
import RequestRectifier from './index';

import 'mocha';

describe('Test file IO with all format', () => {
  it('successful case - JSON', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/intregration.json';
    expect(() =>
      RequestRectifier(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - YAML', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/intregratiom.yaml';
    expect(() =>
      RequestRectifier(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });
});
