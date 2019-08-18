// tslint:disable: no-console

import XML from 'fast-xml-parser';
import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';
import { RuleSet } from '../types';
import isHttpRequestObject from './isHttpRequestObject';

const toXML = new XML.j2xParser({
  format: true,
  ignoreAttributes: true,
  indentBy: '  '
});

const handleXML = (ruleSet?: RuleSet, reversed: boolean = false) => {
  const useRules = rulesConfiguration(ruleSet, reversed);
  return (
    inputFilePath: string,
    outputFilePath: string,
    callback: (obj: { error?: any; result?: any }) => any = ({ error }) => {
      console.log(error);
    }
  ) => {
    if (!inputFilePath) {
      throw Error('Input file path cannot be empty.');
    }
    if (!outputFilePath) {
      throw Error('Output file path ile path cannot be empty.');
    }
    return fs.readFile(
      inputFilePath,
      'utf-8',
      (error: NodeJS.ErrnoException, data: string) => {
        if (error) {
          callback({ error });
        }

        const dataObject = XML.parse(data);

        const rootKey = Object.keys(dataObject)[0];

        if (!rootKey || !isHttpRequestObject(dataObject[rootKey])) {
          throw TypeError(`Data from ${inputFilePath} is invalid.`);
        }

        const modifiedDataObject = useRules({
          ...requestObjectTemplate,
          ...dataObject[rootKey]
        });

        // Almost the same as writeFile, except that if the directory does not exist, it's created.
        fs.outputFile(
          outputFilePath,
          toXML.parse({ [rootKey]: modifiedDataObject }),
          (err: Error) => {
            if (error) {
              callback({ error: err });
            }
            return;
          }
        );
      }
    );
  };
};
export default handleXML;
