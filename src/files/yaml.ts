// tslint:disable: no-console
// command: ts-node src/files/yaml.ts

import fs from 'fs-extra';
import { requestObjectTemplate } from '../constants';
import defaultRulesConfiguration from '../rules';

import YAML from 'yaml';

fs.readFile(
  './test-file/source.yaml',
  'utf-8',
  (error: NodeJS.ErrnoException, data: string) => {
    if (error) {
      console.log(error);
    }

    const dataObject = YAML.parse(data);
    const modifiedDataObject = defaultRulesConfiguration({
      ...requestObjectTemplate,
      ...dataObject
    });

    // lmost the same as writeFile, except that if the directory does not exist, it's created.
    fs.outputFile('./test-file/output/dist.yaml', data, () => {
      console.log('Copy paste')
      return;
    });

    dataObject.description = 'Test json file for fs';

    fs.outputFile(
      './test-file/output/modified.yaml',
      YAML.stringify(modifiedDataObject),
      () => {
        console.log('Modified by rules')
        return;
      }
    );
  }
);
