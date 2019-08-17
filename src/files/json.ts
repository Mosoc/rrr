// tslint:disable: no-console

import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';
import { RuleSet } from '../types';

const handleJSON = (ruleSet?: RuleSet, reversed: boolean = false) => {
  const useRules = rulesConfiguration(ruleSet, reversed);
  return (
    inputFilePath: string,
    outputFilePath: string,
    callback: (obj: { error?: any }) => any = ({ error }) => {
      console.log(error);
    }
  ) => {
    return fs.readFile(
      inputFilePath,
      'utf-8',
      (error: NodeJS.ErrnoException, data: string) => {
        if (error) {
          callback({ error });
        }

        const dataObject = JSON.parse(data);

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
