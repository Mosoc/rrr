import { expect } from 'chai';
import RequestRectifier, { useDefaultRules } from './index';

import 'mocha';

const useCustomRules = RequestRectifier();

describe('Test file IO with all format', () => {
  it('successful case - JSON', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/intregration.json';
    expect(() =>
      RequestRectifier()(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - YAML', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/intregration.yaml';
    expect(() =>
      RequestRectifier()(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });

  it('successful case - useDefaultRules - JSON', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/intregration-default.json';
    expect(() =>
      useDefaultRules(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - useDefaultRules - YAML', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/intregration-default.yaml';
    expect(() =>
      useDefaultRules(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });

  it('successful case - useCustomRules - JSON', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/intregration-custom.json';
    expect(() =>
      useCustomRules(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - useCustomRules - YAML', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/intregration-custom.yaml';
    expect(() =>
      useCustomRules(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });
});
