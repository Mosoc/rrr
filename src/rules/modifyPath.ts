import { HttpRequestMethod, HttpRequestObject } from '../types';

const modifyPath = (
  method: HttpRequestMethod,
  selectedPath: string,
  distinationPath: string
) => (input: HttpRequestObject): HttpRequestObject => {
  if (selectedPath === distinationPath) {
    return input;
  }
  if (input.method !== method) {
    return input;
  }
  return input;
};

export default modifyPath;
