import { HttpRequestMethod, HttpRequestObject } from '../types';

const checkRefererHeader = (
  methods: HttpRequestMethod[],
  hostname: string
) => (input: HttpRequestObject): HttpRequestObject => {
    methods
    hostname
  if (!methods.includes(input.method)) {
     return input;
  }

  if(input.headers.Referer) {
    if (hostname !== new URL(input.headers.Referer).hostname) {
      throw new Error('Wrong referer header')
    }
  } else {
    throw new Error('Cannot find referer header')
  }

  return input;
};

export default checkRefererHeader;
