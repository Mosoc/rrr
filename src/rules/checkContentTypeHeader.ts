import { HttpRequestMethod, HttpRequestObject } from '../types';

const checkContentTypeHeader = (
  methods: HttpRequestMethod[],
  contentType: string
) => (input: HttpRequestObject): HttpRequestObject => {
  if (!methods.includes(input.method)) {
    return input;
  }

  if (input.headers['Content-Type']) {
    if (input.headers['Content-Type'].split(';')[0] !== contentType) {
      throw new Error('Wrong content-type header');
    }
  } else {
    throw new Error('Cannot find content-type header');
  }

  return input;
};

export default checkContentTypeHeader;
