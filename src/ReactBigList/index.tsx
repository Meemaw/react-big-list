import * as React from 'react';

import { ListifyProps, MembersCache, SortDirection } from '../types';
import { applyFilters, debounce, filterByQueryString, paginate, sort } from '../utils';

type State<T> = {
  pageNumber: number;
  queryString: string;
  activeFilters: string[];
  displayedCount: number;
  slicedMembers: T[];
  numPages: number;
  displayingFrom: number;
  displayingTo: number;
  activePage: number;
  filteredCount: number;
  sortDirection?: SortDirection;
  sortColumn?: string;
};

const DEFAULT_DEBOUNCE_TIME_TYPING = 125; // 125ms + 75ms = 200ms
const DEFAULT_DEBOUNCE_TIME = 75; // 100ms

class ReactBigList<T> extends React.Component<ListifyProps<T>, State<T>> {
  static defaultProps = {
    members: [],
    initialPageNumber: 1,
    initialQueryString: '',
    initialActiveFilters: [],
    sortProps: {},
    children: ({}) => <div>Please provide children function to render your data!</div>,
  };

  constructor(props: ListifyProps<T>) {
    super(props);
    this.state = {
      pageNumber: this.props.initialPageNumber!,
      queryString: this.props.initialQueryString!,
      activeFilters: this.props.initialActiveFilters!,
      sortDirection: this.props.initialSortDirection,
      sortColumn: undefined,
      slicedMembers: [],
      filteredCount: 0,
      displayedCount: 0,
      numPages: 1,
      displayingFrom: 0,
      displayingTo: 0,
      activePage: 1,
    };
    this._relistify = debounce(this._relistify, DEFAULT_DEBOUNCE_TIME);
    this._relistify_typing = debounce(this._relistify, DEFAULT_DEBOUNCE_TIME_TYPING);
  }

  componentDidMount() {
    this._relistify(this.props.members);
  }

  membersReference: T[] = this.props.members;

  sortingCache: MembersCache<T> = {};

  queryStringCache: MembersCache<T> = {};

  shouldComponentUpdate(nextProps: ListifyProps<T>, _: State<T>) {
    if (nextProps.members !== this.membersReference) {
      this.sortingCache = {};
      this.queryStringCache = {};
      this.membersReference = nextProps.members;
      this._relistify(nextProps.members);
      return false;
    }

    const nextPageSize = nextProps.paginationProps ? nextProps.paginationProps.pageSize : 0;
    const currentPageSize = this.props.paginationProps ? this.props.paginationProps.pageSize : 0;
    if (nextPageSize !== currentPageSize) {
      this._relistify(nextProps.members);
      return false;
    }
    return true;
  }

  setPageNumber = (pageNumber: number) => {
    this.setState({ pageNumber });
    this._relistify(this.props.members);
  };

  setQueryString = (queryString: string) => {
    this.setState({ queryString });
    this._relistify_typing(this.props.members);
  };

  clearFilters = () => {
    this.setState({ activeFilters: [] });
    this._relistify(this.props.members);
  };

  toggleFilter = (filter: string) => {
    const { activeFilters } = this.state;
    const newFilters = !activeFilters.some(activeFilter => activeFilter === filter)
      ? [...activeFilters, filter]
      : activeFilters.filter(x => x !== filter);

    this.setState({ activeFilters: newFilters });
    this._relistify(this.props.members);
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
    this._relistify(this.props.members);
  };

  _relistify_typing(members: T[]): void {
    this._relistify(members);
  }

  _relistify(members: T[]): void {
    let modifiedMembers = this._sort(members);
    modifiedMembers = this._queryStringFilter(modifiedMembers);
    modifiedMembers = this._customFilter(modifiedMembers);

    const { slicedMembers, numPages, displayingFrom, displayingTo, activePage } = this._paginate(
      modifiedMembers,
    );

    this.setState({
      displayedCount: slicedMembers.length,
      slicedMembers,
      numPages,
      displayingFrom,
      displayingTo,
      activePage,
      filteredCount: modifiedMembers.length,
    });
  }

  _queryStringFilter(members: T[]): T[] {
    const { queryString, sortColumn, sortDirection } = this.state;
    const { queryStringFilter } = this.props;

    return filterByQueryString(
      members,
      queryString,
      queryStringFilter,
      this.queryStringCache,
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
    const { activeFilters } = this.state;
    const { customFilterProps } = this.props;
    return applyFilters(members, activeFilters, customFilterProps);
  }

  render() {
    const { children, members } = this.props;
    const initialCount = members.length;
    const {
      queryString,
      activeFilters,
      sortColumn,
      sortDirection,
      slicedMembers,
      numPages,
      displayingFrom,
      activePage,
      displayingTo,
      filteredCount,
    } = this.state;

    return children!({
      sortColumn,
      sortDirection,
      activeFilters,
      initialCount,
      numPages,
      displayingFrom,
      displayingTo,
      activePage,
      filteredCount,
      queryString,
      members: slicedMembers,
      displayedCount: slicedMembers.length,
      setPageNumber: this.setPageNumber,
      setQueryString: this.setQueryString,
      toggleFilter: this.toggleFilter,
      clearFilters: this.clearFilters,
      setSort: this.setSort,
    });
  }
}

export default ReactBigList;
