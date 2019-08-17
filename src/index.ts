import * as Files from './files';
import * as Rules from './rules';
import { RuleSet } from './types';

const RequestRectifier = (ruleSet?: RuleSet, reversed: boolean = false) => {
  const handleJSON = Files.handleJSON(ruleSet, reversed);
  const handleXML = Files.handleXML(ruleSet, reversed);
  const handleYAML = Files.handleYAML(ruleSet, reversed);
  return (
    inputFilePath: string,
    outputFilePath: string,
    fileFormat: string = 'json', // Use JSON format as default
    callback?: (obj: { error?: any; result?: any }) => any
  ) => {
    switch (fileFormat.toLowerCase()) {
      case 'json': {
        handleJSON(inputFilePath, outputFilePath, callback);
        break;
      }
      case 'xml': {
        handleXML(inputFilePath, outputFilePath, callback);
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
