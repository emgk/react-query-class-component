/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { forwardRefProps } from './types';
import { QueryClientClassContext } from './QueryClientClassProvider';

const withQueryClient = (Element: React.ComponentClass<any>) => {
  return React.forwardRef((props: forwardRefProps, ref: React.Ref<any>) => (
    <QueryClientClassContext.Consumer>
      {(data) => <Element reactQueries={data} {...props} ref={ref} />}
    </QueryClientClassContext.Consumer>
  ));
};

export default withQueryClient;
