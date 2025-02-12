import micromatch from 'micromatch';
import { HttpRequestMethod, HttpRequestObject } from '../types';
import * as Cookies from '../utils/cookie';

const checkCookie = (
  methods: HttpRequestMethod[],
  path: string,
  cookieRequired: string,
  value?: string
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

    if (input.headers.Cookie) {
      const cookies = Cookies.parse(input.headers.Cookie);
      if (!cookies.hasOwnProperty(cookieRequired)) {
        throw new Error(`${cookieRequired} is not in cookie header.`);
      } else {
        if (value && value !== cookies[cookieRequired]) {
          throw new Error(`${cookieRequired} value is incorrect.`);
        }
      }
    } else {
      throw new Error('Cookie header is not exist.');
    }

    return input;
  };
};
export default checkCookie;
