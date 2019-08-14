export type HttpRequestMethod =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

export interface HttpRequestHeaders {
  Accept?: string;
  'Accept-Language'?: string;
  'Accept-Patch'?: string;
  'Accept-Ranges'?: string;
  'Access-Control-Allow-Credentials'?: string;
  'Access-Control-Allow-Headers'?: string;
  'Access-Control-Allow-Methods'?: string;
  'Access-Control-Allow-Origin'?: string;
  'Access-Control-Expose-Headers'?: string;
  'Access-Control-Max-Age'?: string;
  Age?: string;
  Allow?: string;
  'Alt-Svc'?: string;
  Authorization?: string;
  'Cache-Control'?: string;
  Connection?: string;
  'Content-Disposition'?: string;
  'Content-Encoding'?: string;
  'Content-Language'?: string;
  'Content-Length'?: string;
  'Content-Location'?: string;
  'Content-Range'?: string;
  'Content-Type'?: string;
  Cookie?: string;
  Date?: string;
  Expect?: string;
  Expires?: string;
  Forwarded?: string;
  From?: string;
  Host?: string;
  'If-Match'?: string;
  'If-Modified-Since'?: string;
  'If-None-Match'?: string;
  'If-Unmodified-Since'?: string;
  'Last-Modified'?: string;
  Location?: string;
  Pragma?: string;
  'Proxy-Authenticate'?: string;
  'Proxy-Authorization'?: string;
  'Public-Key-Pins'?: string;
  Range?: string;
  Referer?: string;
  'Retry-After'?: string;
  'Set-Cookie'?: string[];
  'Strict-Transport-Security'?: string;
  Tk?: string;
  Trailer?: string;
  'Transfer-Encoding'?: string;
  Upgrade?: string;
  'User-Agent'?: string;
  Vary?: string;
  Via?: string;
  Warning?: string;
  'WWW-Authenticate'?: string;
  [Header: string]: string | string[] | undefined;
}

export interface HttpRequestObject {
  url: string;
  method: HttpRequestMethod;
  headers: HttpRequestHeaders;
}
