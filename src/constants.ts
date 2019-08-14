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

export const requestHeaderTemplate: HttpRequestObject = {
  url: '',
  method: 'GET',
  headers: {}
};