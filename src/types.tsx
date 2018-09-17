import * as React from 'react';

export type SortDirection = 'asc' | 'desc';

export interface ListifyProps<T> extends React.Props<ReactBigList<T>> {
  members: T[];
  queryString?: string | null;
  children?: (childrenProps: ChildrenProps<T>) => React.ReactNode;
  queryStringFilter?: QueryStringFilter<T>;
  paginationProps?: PaginationProps;
  sortProps?: SortProps<T>;
  customFilterProps?: CustomFilterProps<T>;
  initialPageNumber?: number;
  initialQueryString?: string;
  initialActiveFilters?: string[];
  initialSortDirection?: SortDirection;
  persistanceId?: string;
}

export type Cache<T> = { [cacheKey: string]: T };

export type QueryStringFilter<T> = (member: T, queryString: string) => boolean;

export type CustomFilterMap<T> = { [filter: string]: FilterFunction<T> };

export type MembersCache<T> = Cache<T[]>;

export type HOC<PWrapped, PHoc> =
  | React.ComponentClass<PWrapped & PHoc>
  | React.SFC<PWrapped & PHoc>;

export interface PaginationProps {
  pageSize?: number;
}

export interface CustomFilterProps<T> {
  activeFilters?: string[];
  filterMap?: CustomFilterMap<T>;
}

export type FilterFunction<T> = (member: T) => boolean;

export type SortFunction<T extends any> = (member: T) => T;

export interface ListSortProps<T> {
  sortFunction?: SortFunction<T>;
}

export interface TableSortProps<T> {
  sortFunctionMap?: { [column: string]: SortFunction<T> };
}

export type SortProps<T> = TableSortProps<T> | ListSortProps<T>;

export interface PaginationData extends PaginationProps {
  numPages?: number;
  displayedCount: number;
  filteredCount: number;
  initialCount: number;
  displayingFrom: number;
  displayingTo: number;
  activePage: number;
}

export interface ChildrenProps<T> extends PaginationData {
  displayedMembers: T[];
  filteredUsers: T[];
  setPageNumber: (pageNumber: number) => void;
  setQueryString: (queryString: string) => void;
  queryString: string;
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  setSort: (sortColumn?: string) => void;
  sortDirection?: 'asc' | 'desc';
  sortColumn?: string;
}

declare class ReactBigList<T> extends React.Component<ListifyProps<T>, any> {}

export default ReactBigList;
