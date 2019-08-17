import * as Files from './files';
import * as Rules from './rules';
import { RuleSet } from './types';

const RequestRectifier = (ruleSet?: RuleSet) => {
  const handleJSON = Files.handleJSON(ruleSet);
  const handleYAML = Files.handleYAML(ruleSet);
  return (
    inputFilePath: string,
    outputFilePath: string,
    fileFormat: string = 'json', // Use JSON format as default
    callback?: (obj: { error?: any }) => any
  ) => {
    switch (fileFormat.toLowerCase()) {
      case 'json': {
        handleJSON(inputFilePath, outputFilePath, callback);
        break;
      }
      case 'yaml': {
        handleYAML(inputFilePath, outputFilePath, callback);
        break;
      }
      default: {
        throw Error(`${fileFormat} is not supported.`);
      }
    }
  };
};

const useDefaultRules = RequestRectifier();

export default RequestRectifier;
export { Files, Rules, useDefaultRules };
