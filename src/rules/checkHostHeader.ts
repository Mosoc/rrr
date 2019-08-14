import { HttpRequestMethod, HttpRequestObject } from '../types';

const checkHostHeader = (methods: HttpRequestMethod[], hostname: string) => (
  input: HttpRequestObject
): HttpRequestObject => {
  methods;
  hostname;
  if (!methods.includes(input.method)) {
    return input;
  }

  if (input.headers.Host) {
    // Host: <host>:<port>
    if (hostname !== input.headers.Host.split(':')[0]) {
      throw new Error('Wrong host header');
    }
  } else {
    throw new Error('Cannot find host header');
  }

  return input;
};

export default checkHostHeader;
