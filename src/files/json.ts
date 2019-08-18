// tslint:disable: no-console

import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';
import { RuleSet } from '../types';
import isHttpRequestObject from './isHttpRequestObject';

const handleJSON = (ruleSet?: RuleSet, reversed: boolean = false) => {
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

        const dataObject = JSON.parse(data);
        if (!isHttpRequestObject(dataObject)) {
          throw TypeError(`Data from ${inputFilePath} is invalid.`);
        }
        const modifiedDataObject = useRules({
          ...requestObjectTemplate,
          ...dataObject
        });

        // Almost the same as writeFile, except that if the directory does not exist, it's created.
        fs.outputFile(
          outputFilePath,
          JSON.stringify(modifiedDataObject, null, 2),
          (err: Error) => {
            if (err) {
              callback({ error: err });
            }
            return;
          }
        );
      }
    );
  };
};

export default handleJSON;
