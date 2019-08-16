// tslint:disable: no-console

import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import defaultRulesConfiguration from '../rules';
const handleJSON = (
  inputFilePath: string,
  outputFilePath: string,
  callback: (obj: { error?: any }) => any = ({ error }) => {
    console.log(error);
  }
) =>
  fs.readFile(
    inputFilePath,
    'utf-8',
    (error: NodeJS.ErrnoException, data: string) => {
      if (error) {
        callback({ error });
      }

      const dataObject = JSON.parse(data);

      const modifiedDataObject = defaultRulesConfiguration({
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

export default handleJSON;
