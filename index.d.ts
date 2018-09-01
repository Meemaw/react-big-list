import * as React from 'react';

export type SortDirection = 'asc' | 'desc';

export interface ListifyProps<T> extends React.Props<Listify<T>> {
  members: T[];
  queryString?: string | null;
  children: (childrenProps: ChildrenProps<T>) => React.ReactNode;
  queryStringFilter?: QueryStringFilter<T>;
  paginationProps?: PaginationProps;
  sortProps?: SortProps<T>;
  customFilterProps?: CustomFilterProps<T>;
  initialPageNumber?: number;
  initialQueryString?: string;
  initialActiveFilters?: string[];
  initialSortDirection?: SortDirection;
}

export type QueryStringFilter<T> = (member: T, queryString: string) => boolean;

export type CustomFilterMap<T> = { [filter: string]: FilterFunction<T> };

export type MembersCache<T> = { [key: string]: T[] };

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

export type FilterFunction<T> = (members: T[]) => T[];

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
  members: T[];
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

declare class Listify<T> extends React.Component<ListifyProps<T>, any> {}

declare module 'listify' {

}

export default Listify;
