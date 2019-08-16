// tslint:disable: no-console
// command: ts-node src/files/json.ts
import fs from 'fs-extra';
fs.readFile(
  './test-file/source.json',
  'utf-8',
  (error: NodeJS.ErrnoException, data: string) => {
    if (error) {
      console.log(error);
    }

    console.log(data);
    const dataObject = JSON.parse(data);
    console.log(dataObject);

    // Almost the same as writeFile, except that if the directory does not exist, it's created.
    fs.outputFile('./test-file/copy-dist.json', data, () => {
      return;
    });

    dataObject.url = 'https://www.shopback.com/shopback/me';

    fs.outputFile(
      './test-file/copy-modified.json',
      JSON.stringify(dataObject, null, 2),
      () => {
        return;
      }
    );
    fs.outputJSON('./test-file/copy-modified-json.json', dataObject, {
      spaces: 2
    });
  }
);

fs.readJson('./test-file/source.json', (error: Error, packageObj: any) => {
  if (error) {
    console.log(error);
  }
  console.log(packageObj.name);
});
