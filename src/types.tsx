/**
 * External dependencies
 */
import React from 'react';

export interface forwardRefProps {
  children: React.ReactNode;
}

export interface QueryClientClassProviderProps {
  /**
   * List of queries in following format
   *
   * {
   *      [id1]: {
   *          hook: [react-query instance, eg. useQuery]
   *          params: [react-query hook params]
   *          ...options
   *      },
   *      [id2]: {
   *          hook: [react-query instance, eg. useQuery]
   *          params: [react-query hook params]
   *          ...options
   *      },
   *      // ...and so on!
   * }
   */
  queries?: any; // queries map
  children: (props: any) => React.ReactNode;
}

export interface QueryClientHookProps {
  hook: any;
  params?: any; // hook params
  children: any;
}
