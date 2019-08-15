import { HttpRequestMethod } from '../../types';

export interface RuleConditionOptions {
  methods: HttpRequestMethod[];
  path?: string;
  hostName?: string;
}
