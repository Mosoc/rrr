import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (
  methods: HttpRequestMethod[],
  timestampName: string,
  overwrite: boolean = false
) => (input: HttpRequestObject): HttpRequestObject => {
  const timestamp = new Date().toISOString();
  if (!methods.includes(input.method)) {
    return input;
  }

  if (!overwrite && input.headers.hasOwnProperty(timestampName)) {
    return input;
  }

  const output = {
    ...input,
    headers: {
      ...input.headers,
      [timestampName]: timestamp
    }
  };
  return output;
};

export default addTimestamp;
