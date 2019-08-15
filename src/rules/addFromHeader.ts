import micromatch from 'micromatch';
import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (
  methods: HttpRequestMethod[],
  path: string,
  value: string
) => (input: HttpRequestObject): HttpRequestObject => {
  const isMatch = micromatch.matcher(path);
  const url = new URL(input.url);

  if (!methods.includes(input.method)) {
    return input;
  }

  if (!isMatch(url.pathname)) {
    return input;
  }

  const output = {
    ...input,
    headers: {
      ...input.headers,
      From: value
    }
  };
  return output;
};

export default addTimestamp;
