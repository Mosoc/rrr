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
  return input;
};

export default modifyPath;
