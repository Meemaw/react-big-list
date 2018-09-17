import * as React from 'react';

import ReactBigList from '../ReactBigList';
import {
  ChildrenProps,
  CustomFilterMap,
  CustomFilterProps,
  HOC,
  ListifyProps,
  ListSortProps,
  PaginationProps,
  QueryStringFilter,
  TableSortProps,
} from '../types';

export interface BigListConfig<T> {
  pageSize?: number;
  filterMap?: CustomFilterMap<T>;
  queryStringFilter?: QueryStringFilter<T>;
  sortFunctionMap?: TableSortProps<T>;
  sortFunction?: ListSortProps<T>;
}

export function asBigList<P extends ChildrenProps<any>, S>(
  WrappedComponent: HOC<P, S>,
  config?: BigListConfig<any>,
) {
  const actualOptions = config || {};
  const paginationProps: PaginationProps = { pageSize: actualOptions.pageSize };
  const customFilterProps: CustomFilterProps<any> = { filterMap: actualOptions.filterMap };
  const queryStringFilter = actualOptions.queryStringFilter;

  const sortProps = actualOptions.sortFunctionMap
    ? { sortFunctionMap: actualOptions.sortFunctionMap }
    : { sortFunction: actualOptions.sortFunction };

  const hoc = class AsBigList extends React.Component<ListifyProps<any>, S> {
    render() {
      const props: any = this.props;
      return (
        <ReactBigList
          paginationProps={paginationProps}
          customFilterProps={customFilterProps}
          queryStringFilter={queryStringFilter}
          sortProps={sortProps}
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
