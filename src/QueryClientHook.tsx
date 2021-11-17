/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { isSet } from './util';
import { QueryClientHookProps } from './types';

const QueryClientHook: React.FC<QueryClientHookProps> = ({ hook, children, params = {} }) => {
  // check hook
  if (!isSet(hook)) {
    throw new Error(`missing react-query hook for id: '${params?.id}'`);
  }

  return children(hook(...params));
};

export default QueryClientHook;
