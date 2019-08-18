import micromatch from 'micromatch';
import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (
  methods: HttpRequestMethod[],
  path: string,
  value: string,
  overwrite: boolean = false
) => {
  const isMatch = micromatch.matcher(path);
  return (input: HttpRequestObject): HttpRequestObject => {
    if (!methods.includes(input.method)) {
      return input;
    }

    const url = new URL(input.url);
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
};

export default addTimestamp;
