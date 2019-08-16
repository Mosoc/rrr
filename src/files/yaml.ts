// tslint:disable: no-console

import fs from 'fs-extra';
import YAML from 'yaml';
import { requestObjectTemplate } from '../constants';
import defaultRulesConfiguration from '../rules';


const handleYAML = (inputFilePath: string, outputFilePath: string) =>
  fs.readFile(inputFilePath, 'utf-8', (error: NodeJS.ErrnoException, data: string) => {
    if (error) {
      console.log(error);
    }

    const dataObject = YAML.parse(data);
    const modifiedDataObject = defaultRulesConfiguration({
      ...requestObjectTemplate,
      ...dataObject
    });

    dataObject.description = 'Test json file for fs';

    // Almost the same as writeFile, except that if the directory does not exist, it's created.
    fs.outputFile(outputFilePath, YAML.stringify(modifiedDataObject), () => {
      console.log('Modified by rules');
      return;
    });
  });

export default handleYAML;
