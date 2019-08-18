const RequestRectifier = require('../../build/main').default;
const Rules = require('../../build/main').Rules;
const { defaultRuleSet } = Rules;

if (process.argv.length > 4) {
  const argv = process.argv.slice(2);

  // $ node index.js test-files/source.json test-files/output/cli.json json
  const inputFilePath = argv[0];
  const outputFilePath = argv[1];
  const fileFormat = argv[2];

  RequestRectifier(defaultRuleSet)(inputFilePath, outputFilePath, fileFormat);
}
