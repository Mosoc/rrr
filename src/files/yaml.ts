// tslint:disable: no-console

import fs from 'fs-extra';
import YAML from 'yaml';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';
import { RuleSet } from '../types';

const handleYAML = (ruleSet?: RuleSet, reversed: boolean = false) => {
  const useRules = rulesConfiguration(ruleSet, reversed);
  return (
    inputFilePath: string,
    outputFilePath: string,
    callback: (obj: { error?: any; result?: any }) => any = ({ error }) => {
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

        const dataObject = YAML.parse(data);
        const modifiedDataObject = useRules({
          ...requestObjectTemplate,
          ...dataObject
        });

        dataObject.description = 'Test json file for fs';

        // Almost the same as writeFile, except that if the directory does not exist, it's created.
        fs.outputFile(
          outputFilePath,
          YAML.stringify(modifiedDataObject),
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
export default handleYAML;
