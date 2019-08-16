import * as Files from './files';

const RequestRectifier = (
  inputFilePath: string,
  outputFilePath: string,
  fileFormat: string = 'json' // Use JSON format as default
) => {
  switch (fileFormat.toLowerCase()) {
    case 'json': {
      Files.handleYAML(inputFilePath, outputFilePath);
      break;
    }
    case 'yaml': {
      Files.handleYAML(inputFilePath, outputFilePath);
      break;
    }
    default: {
      throw Error(`${fileFormat} is not supported.`);
    }
  }
};

export default RequestRectifier;
export { Files };
