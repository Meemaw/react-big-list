import * as React from 'react';

import ReactBigList from '../ReactBigList';
import {
  ChildrenProps,
  CustomFilterMap,
  CustomFilterProps,
  HOC,
  ListifyProps,
  PaginationProps,
} from '../types';

interface Options<T> {
  pageSize?: number;
  filterMap?: CustomFilterMap<T>;
}

export function asBigList<P extends ChildrenProps<any>, S>(
  WrappedComponent: HOC<P, S>,
  options?: Options<any>,
) {
  const actualOptions = options || {};
  const paginationProps: PaginationProps = { pageSize: actualOptions.pageSize };
  const customFilterProps: CustomFilterProps<any> = { filterMap: actualOptions.filterMap };

  const hoc = class AsBigList extends React.Component<ListifyProps<any>, S> {
    render() {
      const props: any = this.props;
      return (
        <ReactBigList
          paginationProps={paginationProps}
          customFilterProps={customFilterProps}
          {...props}
        >
          {bigListProps => <WrappedComponent {...props} {...bigListProps} />}
        </ReactBigList>
      );
    }
  };
  return hoc;
}

export default asBigList;
