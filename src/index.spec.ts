import { expect } from 'chai';
import { allMethods } from './constants';
import RequestRectifier, { Rules, useDefaultRules } from './index';

import 'mocha';

const useCustomRules = RequestRectifier([
  Rules.addTimestamp(allMethods, 'CUSTOM-1-TIMESTAMP'),
  Rules.addTimestamp(allMethods, 'CUSTOM-2-TIMESTAMP'),
  Rules.addTimestamp(allMethods, 'CUSTOM-3-TIMESTAMP')
]);

const useCustomRulesReverse = RequestRectifier(
  [
    Rules.addTimestamp(allMethods, 'CUSTOM-1-TIMESTAMP'),
    Rules.addTimestamp(allMethods, 'CUSTOM-2-TIMESTAMP'),
    Rules.addTimestamp(allMethods, 'CUSTOM-3-TIMESTAMP')
  ],
  true
);

describe('Test file IO with all format', () => {
  it('successful case - JSON', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath = 'test-files/output/intregration.json';
    expect(() =>
      RequestRectifier()(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - XML', () => {
    const inputFilePath = 'test-files/source.xml';
    const outputFilePath = 'test-files/output/intregration.xml';
    expect(() =>
      RequestRectifier()(inputFilePath, outputFilePath, 'xml')
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

  it('successful case - useDefaultRules - XML', () => {
    const inputFilePath = 'test-files/source.xml';
    const outputFilePath = 'test-files/output/intregration-default.xml';
    expect(() =>
      useDefaultRules(inputFilePath, outputFilePath, 'xml')
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

  it('successful case - useCustomRules - XML', () => {
    const inputFilePath = 'test-files/source.xml';
    const outputFilePath = 'test-files/output/intregration-custom.xml';
    expect(() =>
      useCustomRules(inputFilePath, outputFilePath, 'xml')
    ).to.not.throw();
  });


  it('successful case - useCustomRules - YAML', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath = 'test-files/output/intregration-custom.yaml';
    expect(() =>
      useCustomRules(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });

  it('successful case - useCustomRules - JSON - reversed', () => {
    const inputFilePath = 'test-files/source.json';
    const outputFilePath =
      'test-files/output/intregration-custom-reversed.json';
    expect(() =>
      useCustomRulesReverse(inputFilePath, outputFilePath, 'json')
    ).to.not.throw();
  });

  it('successful case - useCustomRules - XML - reversed', () => {
    const inputFilePath = 'test-files/source.xml';
    const outputFilePath =
      'test-files/output/intregration-custom-reversed.xml';
    expect(() =>
      useCustomRulesReverse(inputFilePath, outputFilePath, 'xml')
    ).to.not.throw();
  });

  it('successful case - useCustomRules - YAML - reversed', () => {
    const inputFilePath = 'test-files/source.yaml';
    const outputFilePath =
      'test-files/output/intregration-custom-reversed.yaml';
    expect(() =>
      useCustomRulesReverse(inputFilePath, outputFilePath, 'YAML')
    ).to.not.throw();
  });
});
