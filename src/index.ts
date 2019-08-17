import * as Files from './files';
import * as Rules from './rules';

const RequestRectifier = () => {
  return (
    inputFilePath: string,
    outputFilePath: string,
    fileFormat: string = 'json', // Use JSON format as default
    callback?: (obj: { error?: any }) => any
  ) => {
    switch (fileFormat.toLowerCase()) {
      case 'json': {
        Files.handleJSON(inputFilePath, outputFilePath, callback);
        break;
      }
      case 'yaml': {
        Files.handleYAML(inputFilePath, outputFilePath, callback);
        break;
      }
      default: {
        throw Error(`${fileFormat} is not supported.`);
      }
    }
  };
};

const useDefaultRules = (
  inputFilePath: string,
  outputFilePath: string,
  fileFormat: string = 'json', // Use JSON format as default
  callback?: (obj: { error?: any }) => any
) => {
  switch (fileFormat.toLowerCase()) {
    case 'json': {
      Files.handleJSON(inputFilePath, outputFilePath, callback);
      break;
    }
    case 'yaml': {
      Files.handleYAML(inputFilePath, outputFilePath, callback);
      break;
    }
    default: {
      throw Error(`${fileFormat} is not supported.`);
    }
  }
};
export default RequestRectifier;
export { Files, Rules, useDefaultRules };
