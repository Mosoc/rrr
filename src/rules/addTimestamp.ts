import { HttpRequestMethod, HttpRequestObject } from '../types';

const addTimestamp = (
  methods: HttpRequestMethod[],
  timestampName: string,
  overwrite: boolean = false
) => {
  return (input: HttpRequestObject): HttpRequestObject => {
    if (!methods.includes(input.method)) {
      return input;
    }

    if (!overwrite && input.headers.hasOwnProperty(timestampName)) {
      return input;
    }

    const timestamp = new Date().toISOString();
    const output = {
      ...input,
      headers: {
        ...input.headers,
        [timestampName]: timestamp
      }
    };
    return output;
  };
};

export default addTimestamp;
