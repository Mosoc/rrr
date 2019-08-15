import micromatch from 'micromatch';
import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (
  methods: HttpRequestMethod[],
  path: string,
  value: string,
  overwrite: boolean = false
) => (input: HttpRequestObject): HttpRequestObject => {
  const isMatch = micromatch.matcher(path);
  const url = new URL(input.url);

  if (!methods.includes(input.method)) {
    return input;
  }

  if (!isMatch(url.pathname)) {
    return input;
  }
  if (!overwrite && input.headers.hasOwnProperty('From')) {
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
