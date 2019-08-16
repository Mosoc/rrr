import RequestRectifier from './index';

if (process.argv.length > 4) {
  const argv = process.argv.slice(2);

  // $ ts-node src/main test-files/source.json test-files/output/cli.json json
  const inputFilePath = argv[0];
  const outputFilePath = argv[1];
  const fileFormat = argv[2];

  RequestRectifier(inputFilePath, outputFilePath, fileFormat);
}
