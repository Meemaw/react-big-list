import * as React from 'react';

import { FilterFunction, ListifyProps, MembersCache, SortDirection } from '../../';
import { filterByQueryString, paginate, sort } from '../utils';

type State = {
  pageNumber: number;
  queryString: string;
  activeFilters: string[];
  sortDirection?: SortDirection;
  sortColumn?: string;
};

class Listify<T> extends React.Component<ListifyProps<T>, State> {
  static defaultProps = {
    members: [],
    initialPageNumber: 1,
    initialQueryString: '',
    initialActiveFilters: [],
    sortProps: {},
  };

  membersReference: T[] = this.props.members;

  constructor(props: ListifyProps<T>) {
    super(props);
    this.state = {
      pageNumber: this.props.initialPageNumber!,
      queryString: this.props.initialQueryString!,
      activeFilters: this.props.initialActiveFilters!,
      sortDirection: this.props.initialSortDirection,
      sortColumn: undefined,
    };
  }

  // TODO remove
  getCacheKey = (): string => {
    const { queryString } = this.state;
    return `${queryString}-${this.getSortCacheKey()}`;
  };

  // TODO remove
  getSortCacheKey = (): string => {
    const { sortDirection, sortColumn } = this.state;
    return `${sortDirection || ''}-${sortColumn || ''}`;
  };

  sortingCache: MembersCache<T> = {
    [this.getSortCacheKey()]: this.props.members,
  };

  queryStringCache: MembersCache<T> = {
    [this.getCacheKey()]: this.props.members,
  };

  shouldComponentUpdate(nextProps: ListifyProps<T>, _: State) {
    if (nextProps.members !== this.membersReference) {
      this.queryStringCache = { [this.getCacheKey()]: nextProps.members };
      this.sortingCache = { [this.getSortCacheKey()]: nextProps.members };
      this.membersReference = nextProps.members;
    }
    return true;
  }

  setPageNumber = (pageNumber: number) => this.setState({ pageNumber });

  setQueryString = (queryString: string) => this.setState({ queryString });

  clearFilters = () => this.setState({ activeFilters: [] });

  toggleFilter = (filter: string) => {
    const { activeFilters } = this.state;
    const newFilters = !activeFilters.some(activeFilter => activeFilter === filter)
      ? [...activeFilters, filter]
      : activeFilters.filter(x => x !== filter);

    this.setState({ activeFilters: newFilters });
  };

  setSort = (clickedColumn?: string): void => {
    const { sortDirection, sortColumn } = this.state;
    if (clickedColumn !== sortColumn) {
      this.setState({
        sortColumn: clickedColumn,
        sortDirection: 'asc',
      });
    } else {
      this.setState({
        sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
      });
    }
  };

  /*TODO call this debounced
  _relistify(): void {
    const { members } = this.props;

    let modifiedMembers = this._sort(members);
    modifiedMembers = this._queryStringFilter(modifiedMembers);
    modifiedMembers = this._customFilter(modifiedMembers);

    const { slicedMembers, numPages, displayingFrom, displayingTo, activePage } = this._paginate(
      modifiedMembers,
    );

   
    this.setState({
      displayedCount: slicedMembers.length,
      members: slicedMembers,
      numPages,
      displayingFrom,
      displayingTo,
      activePage,
      filteredCount: modifiedMembers.length,
    });
  }
   */

  _queryStringFilter(members: T[]): T[] {
    const { queryString, sortColumn, sortDirection } = this.state;
    const { queryStringFilter } = this.props;

    return filterByQueryString(
      members,
      this.queryStringCache,
      queryString,
      queryStringFilter,
      sortColumn,
      sortDirection,
    );
  }

  _sort(members: T[]): T[] {
    const { sortColumn, sortDirection } = this.state;
    const { sortProps } = this.props;
    return sort(members, sortDirection, sortColumn, sortProps, this.sortingCache);
  }

  _paginate(members: T[]) {
    const { paginationProps } = this.props;
    const { pageNumber } = this.state;
    return paginate(members, pageNumber, paginationProps);
  }

  _customFilter(members: T[]) {
    const { customFilterProps } = this.props;
    if (!customFilterProps || !customFilterProps.filterMap) {
      return members;
    }
    const { activeFilters } = this.state;
    const { filterMap } = customFilterProps;

    return activeFilters.reduce((accMembers, filterName) => {
      const filterFunction: FilterFunction<T> = filterMap[filterName];
      return filterFunction ? filterFunction(accMembers) : accMembers;
    }, members);
  }

  render() {
    const { children, members } = this.props;
    const { queryString, activeFilters, sortColumn, sortDirection } = this.state;
    const initialCount = members.length;

    let modifiedMembers = this._sort(members);
    modifiedMembers = this._queryStringFilter(modifiedMembers);
    modifiedMembers = this._customFilter(modifiedMembers);

    const { slicedMembers, numPages, displayingFrom, displayingTo, activePage } = this._paginate(
      modifiedMembers,
    );

    return children({
      members: slicedMembers,
      initialCount,
      displayedCount: slicedMembers.length,
      numPages,
      displayingFrom,
      displayingTo,
      activePage,
      filteredCount: modifiedMembers.length,
      setPageNumber: this.setPageNumber,
      queryString,
      setQueryString: this.setQueryString,
      activeFilters,
      toggleFilter: this.toggleFilter,
      clearFilters: this.clearFilters,
      setSort: this.setSort,
      sortColumn,
      sortDirection,
    });
  }
}

export default Listify;
