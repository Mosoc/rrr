export type HttpRequestMethod = '*' | 'ALL' | 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'

export interface HttpRequestHeaders {
  'Accept'?: string;
  'Accept-language'?: string;
  'Accept-patch'?: string;
  'Accept-ranges'?: string;
  'Access-control-allow-credentials'?: string;
  'Access-control-allow-headers'?: string;
  'Access-control-allow-methods'?: string;
  'Access-control-allow-origin'?: string;
  'Access-control-expose-headers'?: string;
  'Access-control-max-age'?: string;
  'Age'?: string;
  'Allow'?: string;
  'Alt-svc'?: string;
  'Authorization'?: string;
  'Cache-control'?: string;
  'Connection'?: string;
  'Content-disposition'?: string;
  'Content-encoding'?: string;
  'Content-language'?: string;
  'Content-length'?: string;
  'Content-location'?: string;
  'Content-range'?: string;
  'Content-type'?: string;
  'Cookie'?: string;
  'Date'?: string;
  'Expect'?: string;
  'Expires'?: string;
  'Forwarded'?: string;
  'From'?: string;
  'Host'?: string;
  'If-match'?: string;
  'If-modified-since'?: string;
  'If-none-match'?: string;
  'If-unmodified-since'?: string;
  'Last-modified'?: string;
  'Location'?: string;
  'Pragma'?: string;
  'Proxy-authenticate'?: string;
  'Proxy-authorization'?: string;
  'Public-key-pins'?: string;
  'Range'?: string;
  'Referer'?: string;
  'Retry-after'?: string;
  'Set-cookie'?: string[];
  'Strict-transport-security'?: string;
  'Tk'?: string;
  'Trailer'?: string;
  'Transfer-encoding'?: string;
  'Upgrade'?: string;
  'User-agent'?: string;
  'Vary'?: string;
  'Via'?: string;
  'Warning'?: string;
  'WWW-authenticate'?: string;
  [Header: string]: string | string[] | undefined;
}

export interface HttpRequestObject {
  url: string
  method: HttpRequestMethod
  headers: HttpRequestHeaders
}