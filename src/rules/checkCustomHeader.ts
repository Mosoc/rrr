import { HttpRequestMethod, HttpRequestObject } from '../types';

const checkCustomHeader = (
  methods: HttpRequestMethod[],
  customHeaderName: string,
  value?: string
) => {
  return (input: HttpRequestObject): HttpRequestObject => {
    if (!methods.includes(input.method)) {
      return input;
    }

    if (input.headers[customHeaderName]) {
      if (value && value !== input.headers[customHeaderName]) {
        throw new Error(`Header ${customHeaderName} value is incorrect.`);
      }
    } else {
      throw new Error(`Header ${customHeaderName} is not exist.`);
    }

    return input;
  };
};

export default checkCustomHeader;
