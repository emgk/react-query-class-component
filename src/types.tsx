/**
 * External dependencies
 */
import React from 'react';

export interface forwardRefProps {
  children: React.ReactNode;
}

export interface ReactQueryClassProviderProps {
  /**
   * List of queries in following format
   *
   * {
   *      [id1]: {
   *          hook: [react-query instance, eg. useQuery]
   *          params: [react-query hook params]
   *      },
   *      [id2]: {
   *          method: [react-query instance, eg. useQuery]
   *          receiver: [react-query QueryFunctionContext]
   *      },
   *      // ...and so on!
   * }
   */
  queries?: any; // queries map
  children: (props: any) => React.ReactNode;
}
