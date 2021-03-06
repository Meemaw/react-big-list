import orderBy from 'lodash.orderby';

import {
  CustomFilterProps,
  FilterFunction,
  ListSortProps,
  MembersCache,
  PaginationProps,
  QueryStringFilter,
  SortDirection,
  SortProps,
  TableSortProps,
} from '../types';

const MIN_DEBOUNCE_TIME = 20;
const MAX_DEBOUNCE_TIME = 280;

export function estimateDebounceWait(listSize: number): number {
  const listWaitSize = listSize / 500;
  const waitSize = MIN_DEBOUNCE_TIME + listWaitSize;
  return Math.min(waitSize, MAX_DEBOUNCE_TIME);
}

export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: number | undefined;
  return function(this: any, ...args: any[]) {
    const context = this;

    var later = function() {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function filterByQueryString<T>(
  members: T[],
  queryString?: string,
  queryStringFilter?: QueryStringFilter<T>,
  queryStringCache?: MembersCache<T>,
  sortColumn?: string,
  sortDirection?: SortDirection,
) {
  if (isEmpty(queryString)) {
    return members;
  }

  let filterFunction = queryStringFilter;

  const cacheKey = `${queryString}-${sortDirection || ''}-${sortColumn || ''}`;
  if (queryStringCache && queryStringCache[cacheKey]) {
    return queryStringCache[cacheKey];
  }

  if (!filterFunction) {
    if (_ofStringOrNumber(members)) {
      filterFunction = baseFilterFunction;
    } else {
      return members;
    }
  }

  const filteredMembers = members.filter(member => filterFunction!(member, queryString!));
  if (queryStringCache) {
    queryStringCache[cacheKey] = filteredMembers;
  }
  return filteredMembers;
}

export function sort<T>(
  members: T[],
  sortDirection?: 'asc' | 'desc',
  sortColumn?: string,
  sortProps?: SortProps<T>,
  sortCache?: MembersCache<T>,
): T[] {
  if (!sortColumn && !sortDirection) {
    return members;
  }

  const cacheKey = `${sortDirection || ''}-${sortColumn || ''}`;

  if (sortCache && sortCache[cacheKey]) {
    return sortCache[cacheKey];
  }

  let sortFunction = null;
  if (sortProps && 'sortFunctionMap' in sortProps) {
    if (!sortColumn) {
      return members;
    }
    sortFunction = (sortProps as TableSortProps<T>).sortFunctionMap![sortColumn];

    if (!sortFunction) {
      sortFunction = objectFieldSortFunction(sortColumn);
    }
  } else {
    if (sortProps && 'sortFunction' in sortProps) {
      sortFunction = (sortProps as ListSortProps<T>).sortFunction;
    } else if (_ofStringOrNumber(members)) {
      sortFunction = baseSortFunction;
    } else if (sortColumn) {
      sortFunction = objectFieldSortFunction(sortColumn);
    } else {
      return members;
    }
  }

  const sorted = orderBy(members, [sortFunction], [sortDirection]);
  if (sortCache) {
    sortCache[cacheKey] = sorted;
  }
  return sorted;
}

export function paginate<T>(members: T[], pageNumber: number, paginationProps?: PaginationProps) {
  const numMembers = members.length;

  let numPages = 1;
  let slicedMembers = members;
  let displayingFrom = 1;
  let displayingTo = numMembers;

  if (!paginationProps || !paginationProps.pageSize) {
    return { slicedMembers, numPages, displayingFrom, displayingTo, activePage: pageNumber };
  }

  let activePage = 1;
  const { pageSize } = paginationProps!;

  numPages = getNumPages(numMembers, pageSize!);
  activePage = numPages < pageNumber! ? numPages : pageNumber!;
  slicedMembers = sliceData(members, activePage, pageSize!);

  displayingTo = Math.min(activePage * pageSize!, numMembers);
  displayingFrom = numMembers === 0 ? 0 : (activePage - 1) * pageSize! + 1;

  return { slicedMembers, numPages, displayingFrom, displayingTo, activePage };
}

export function applyFilters<T>(
  members: T[],
  activeFilters: string[],
  customFilterProps?: CustomFilterProps<T>,
) {
  if (!customFilterProps || !customFilterProps.filterMap) {
    return members;
  }
  const { filterMap } = customFilterProps;

  return activeFilters.reduce((accMembers, filterName) => {
    const filterFunction: FilterFunction<T> = filterMap[filterName];
    return filterFunction ? accMembers.filter(filterFunction) : accMembers;
  }, members);
}

function isEmpty(s?: string | null) {
  return s === undefined || s === null || s === '';
}

function sliceData<T>(data: T[], pageNumber: number, pageSize: number): T[] {
  return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

function getNumPages(numMembers: number, pageSize: number): number {
  const numPagesCalc = Math.ceil(numMembers / pageSize);
  return numPagesCalc <= 0 ? 1 : numPagesCalc;
}

function baseSortFunction<T>(member: T): T {
  return member;
}

function objectFieldSortFunction<T extends any>(column: string) {
  return (member: T) => delve(member, column);
}

function baseFilterFunction<T extends any>(member: T, queryString: string): boolean {
  const actualValue = typeof member === 'string' ? member : member.toString();
  return actualValue.toLowerCase().includes(queryString.toLowerCase());
}

function delve(
  obj: { [key: string]: any },
  key: string | string[],
  def: any = null,
  p: number = 0,
) {
  p = 0;
  key = (key as string).split ? (key as string).split('.') : key;
  while (obj && p < key.length) obj = obj[key[p++]];
  return obj === undefined || p < key.length ? def : obj;
}

const isString = (obj: any): boolean => {
  return typeof obj === 'string';
};

const isNumber = (obj: any): boolean => {
  return typeof obj === 'number';
};

function _ofStringOrNumber<T>(members: T[]) {
  return members.length > 0 && (isString(members[0]) || isNumber(members[0]));
}
