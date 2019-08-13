import { HttpRequestMethod, HttpRequestObject } from '../types';
const removeQueryString = (methods: HttpRequestMethod[]) => (
  input: HttpRequestObject
): HttpRequestObject => {
  if (!methods.includes(input.method)) {
    return input;
  }
  return input;
};
export default removeQueryString;
