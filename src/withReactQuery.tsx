/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { forwardRefProps } from './types';
import { ReactQueryClassContext } from './ReactQueryClassProvider';

const withReactQuery = (Element: React.ComponentClass<any>) => {
  return React.forwardRef((props: forwardRefProps, ref: React.Ref<any>) => (
    <ReactQueryClassContext.Consumer>
      {(data) => <Element reactQueries={data} {...props} ref={ref} />}
    </ReactQueryClassContext.Consumer>
  ));
};

export default withReactQuery;
