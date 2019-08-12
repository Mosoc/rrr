import { HttpRequestMethod, HttpRequestObject} from '../types';

const modifyPath = (method: HttpRequestMethod) => (input: HttpRequestObject): HttpRequestObject => {
  if(input.method !== method ) { return input; }
  return input;
};

export default modifyPath;
