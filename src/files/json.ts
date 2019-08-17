// tslint:disable: no-console

import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';
import { RuleSet } from '../types';

const handleJSON = (ruleSet?: RuleSet) => (
  inputFilePath: string,
  outputFilePath: string,
  callback: (obj: { error?: any }) => any = ({ error }) => {
    console.log(error);
  }
) => {
  const defaultRules = rulesConfiguration(ruleSet);
  return fs.readFile(
    inputFilePath,
    'utf-8',
    (error: NodeJS.ErrnoException, data: string) => {
      if (error) {
        callback({ error });
      }

      const dataObject = JSON.parse(data);

      const modifiedDataObject = defaultRules({
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

export default handleJSON;
