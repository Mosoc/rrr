import { HttpRequestMethod, HttpRequestObject } from '../types';
const removeQueryString = (methods: HttpRequestMethod[]) => {
  return (input: HttpRequestObject): HttpRequestObject => {
    if (!methods.includes(input.method)) {
      return input;
    }

    const url = new URL(input.url);
    url.search = '';
    const output = { ...input, url: url.href };
    return output;
  };
};
export default removeQueryString;
