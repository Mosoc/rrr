import micromatch from 'micromatch';
import { HttpRequestMethod, HttpRequestObject } from '../types';

const modifyPath = (
  methods: HttpRequestMethod[],
  selectedPath: string,
  destinationPath: string
) => {
  const isMatch = micromatch.matcher(selectedPath);
  return (input: HttpRequestObject): HttpRequestObject => {
    if (selectedPath === destinationPath) {
      return input;
    }

    if (!methods.includes(input.method)) {
      return input;
    }
    const url = new URL(input.url);

    if (!isMatch(url.pathname)) {
      return input;
    }

    url.pathname = destinationPath;
    const output = { ...input, url: url.href };
    return output;
  };
};

export default modifyPath;
