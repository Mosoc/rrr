import { HttpRequestMethod, HttpRequestObject } from '../types';
import * as Cookies from '../utils/cookie';

const checkCookie = (
  methods: HttpRequestMethod[],
  path: string,
  cookieRequired: string
) => (input: HttpRequestObject): HttpRequestObject => {
  if (!methods.includes(input.method)) {
    return input;
  }

  if (path !== new URL(input.url).pathname) {
    return input;
  }

  if (input.headers.Cookie) {
    const cookies = Cookies.parse(input.headers.Cookie);
    if (!cookies.hasOwnProperty(cookieRequired)) {
      throw new Error(`${cookieRequired} is not in cookie header.`);
    }
  } else {
    throw new Error('Cookie header is not exist.');
  }

  return input;
};

export default checkCookie;
