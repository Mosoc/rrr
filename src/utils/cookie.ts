// This is code snippet from theodorejb/es-cookie with fixing coding style by tslint and prettier

export const parse = (cookieString: string): { [name: string]: string } => {
  const result: { [name: string]: string } = {};
  const cookies = cookieString ? cookieString.split('; ') : [];
  const rdecode = /(%[0-9A-Z]{2})+/g;

  for (const item of cookies) {
    const parts = item.split('=');
    let cookie = parts.slice(1).join('=');

    if (cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      const name = parts[0].replace(rdecode, decodeURIComponent);
      result[name] = cookie.replace(rdecode, decodeURIComponent);
    } catch (e) {
      // ignore cookies with invalid name/value encoding
    }
  }

  return result;
};
