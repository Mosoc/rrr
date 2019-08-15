import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (methods: HttpRequestMethod[], timestampName: string) => (
  input: HttpRequestObject
): HttpRequestObject => {
  const timestamp = new Date().toISOString();
  if (!methods.includes(input.method)) {
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
