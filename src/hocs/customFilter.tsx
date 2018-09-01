import * as React from 'react';

import { CustomFilterMap, CustomFilterProps, HOC } from '../types';

interface IWithCustomFilters<T> {
  customFilterProps?: CustomFilterProps<T>;
}

export function withCustomFilters<P, S>(
  WrappedComponent: HOC<P, IWithCustomFilters<any>>,
  filterMap: CustomFilterMap<any>,
) {
  const hoc = class WithCustomFilters extends React.Component<P & IWithCustomFilters<any>, S> {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          customFilterProps={{ ...(this.props.customFilterProps as object), filterMap }}
        />
      );
    }
  };

  return hoc;
}

export default withCustomFilters;
