import { HttpRequestMethod, HttpRequestObject } from '../types';

const modifyPath = (
  methods: HttpRequestMethod[],
  selectedPath: string,
  distinationPath: string
) => (input: HttpRequestObject): HttpRequestObject => {
  if (selectedPath === distinationPath) {
    return input;
  }

  if (!methods.includes(input.method)) {
    return input;
  }
  const url = new URL(input.url);

  if (url.pathname !== selectedPath) {
    return input;
  }

  url.pathname = distinationPath;
  const output = { ...input, url: url.href };
  return output;
};

export default modifyPath;
