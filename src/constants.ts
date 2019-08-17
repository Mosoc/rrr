import { HttpRequestMethod, HttpRequestObject } from './types';

export const allMethods: HttpRequestMethod[] = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE'
];

export const requestObjectTemplate: HttpRequestObject = {
  url: 'https://example.com/',
  method: 'GET',
  headers: {}
};
