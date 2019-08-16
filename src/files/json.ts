// tslint:disable: no-console
// command: ts-node src/files/json.ts
import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import defaultRulesConfiguration from '../rules';

fs.readFile(
  './test-file/source.json',
  'utf-8',
  (error: NodeJS.ErrnoException, data: string) => {
    if (error) {
      console.log(error);
    }

    const dataObject = JSON.parse(data);

    // Almost the same as writeFile, except that if the directory does not exist, it's created.
    fs.outputFile('./test-file/output/dist.json', data, () => {
      console.log('Copy paste')
      return;
    });

    const modifiedDataObject = defaultRulesConfiguration({...requestObjectTemplate, ...dataObject});

    fs.outputFile(
      './test-file/output/modified.json',
      JSON.stringify(modifiedDataObject, null, 2),
      () => {
        console.log('Modified by rules')
        return;
      }
    );
  }
);
