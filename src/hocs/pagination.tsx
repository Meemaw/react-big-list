import * as React from 'react';

import { HOC, PaginationProps } from '../..';

interface IWithPaginationProps {
  paginationProps?: PaginationProps;
}

export function withPageSize<P, S>(
  WrappedComponent: HOC<P, IWithPaginationProps>,
  pageSize: number,
) {
  const hoc = class WithPageSize extends React.Component<P & IWithPaginationProps, S> {
    render() {
      return <WrappedComponent {...this.props} paginationProps={{ pageSize }} />;
    }
  };

  return hoc;
}

export default withPageSize;
