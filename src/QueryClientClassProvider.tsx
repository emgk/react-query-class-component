/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { QueryClientClassProviderProps } from './types';
import { isSet } from './util';

// context instance
export const QueryClientClassContext = React.createContext<any>({});

const QueryClientClassProvider: React.FC<QueryClientClassProviderProps> = ({
  children,
  queries = {},
}) => {
  let mapQueries = {};

  // detect invalid queries value
  if (!isSet(queries || 'object' === typeof queries)) {
    throw new Error(`queries must be passed and type of object`);
  }

  // map react-queries
  Object.keys(queries).forEach((queryKey) => {
    const query = queries?.[queryKey];

    // detect invalid hook
    if (!isSet(query?.hook)) {
      throw new Error(`react-query hook is not passed for query with id: '${queryKey}'`);
    }

    // detect invalid params
    if (!isSet(query?.params)) {
      throw new Error(`params for hook are not passed for query with id: '${queryKey}'`);
    }

    // execute react-query dynamically
    mapQueries = { ...mapQueries, [queryKey]: query?.hook(...(query?.params || [])) };
  });

  return (
    <QueryClientClassContext.Provider value={mapQueries}>
      {children}
    </QueryClientClassContext.Provider>
  );
};

export default QueryClientClassProvider;
