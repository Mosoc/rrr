// tslint:disable: no-console

import fs from 'fs-extra';
import YAML from 'yaml';
import { requestObjectTemplate } from '../constants';
import rulesConfiguration from '../rules';

const handleYAML = (
  inputFilePath: string,
  outputFilePath: string,
  callback: (obj: { error?: any }) => any = ({ error }) => {
    console.log(error);
  }
) => {
  const defaultRules = rulesConfiguration();
  return fs.readFile(
    inputFilePath,
    'utf-8',
    (error: NodeJS.ErrnoException, data: string) => {
      if (error) {
        console.log(error);
        callback({ error });
      }

      const dataObject = YAML.parse(data);
      const modifiedDataObject = defaultRules({
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
            console.log(error);
            callback({ error: err });
          }
          return;
        }
      );
    }
  );
};

export default handleYAML;
