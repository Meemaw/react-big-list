# API

In these API docs, a higher-order component (HOC) refers to a function that accepts a single React component and returns a new React component.

# Reference

- [Components](#components)
  - [`ReactBigList`](#react-big-list)
- [Higher-order components](#higher-order-components)
  - [`asBigList()`](#as-big-list)
  - [`withBigListConfig()`](#with-big-list-config)
  - [`withPageSize()`](#with-page-size)
  - [`withCustomFilters()`](#with-custom-filters)
- [Props passed to children](#props-children)

## Components

### `ReactBigList`

###### Props: ReactBigListProps

**members: T[]**

Array of all your records

**children?: (childrenProps: ChildrenProps<T>) => React.ReactNode**

```js
<ReactBigList children={({pageSize, ...rest}) => <div>Big List</div>}>
```

Function accepting ChildrenProps and returning React Node.

**paginationProps?: PaginationProps - { pageSize: number }**

Pagination props object containing size of rendered pages.

**sortProps?: SortProps**

```js
type SortProps<T> = TableSortProps<T> | ListSortProps<T>;

interface ListSortProps<T> {
  sortFunction?: SortFunction<T>;
}

interface TableSortProps<T> {
  sortFunctionMap?: { [column: string]: SortFunction<T> };
}

type SortFunction<T extends any> = (member: T) => T;
```

SortFunction maps object before sort is applied. Can be used to map unsortable objects to some sortable values.

**customFilterProps?: CustomFilterProps**

```js
type CustomFilterProps = {
  filterMap?: { [filter: string]: FilterFunction<T> },
};

type FilterFunction<T> = (member: T) => boolean;
```

FilterFunction takes a member and returns a boolean whether member should be in filtered collection.

**initialPageNumber?: number**

Initial pagination page number to be rendered.

**initialQueryString?: string**

Initial queryString to be used with filtering on initial render.

**initialActiveFilters?: string[]**

List of initially active filters.

**initialSortDirection?: 'asc' | 'desc'**

Initial sort direction.

**persistanceId?: string**

Unique identifier to be used for data persistance between remounts.

## Higher-order components

Create higher-order-component to reuse ReactBigList configs.

###### `asBigList(WrappedComponent: React.ReactNode, config?: BigListConfig<any>)`

```js
const EnhancedComponent = asBigList(Component, { pageSize: 10 });
```

###### `withBigListConfig(config?: BigListConfig<any>)`

```js
const enhancer = withBigListConfig({ pageSize: 10 });
const EnhancedComp1 = enhancer(Component1);
const EnhancedComp2 = enhancer(Component2);
```

###### `withPageSize(WrappedComponent: React.ReactNode, pageSize: number)`

```js
const WithPageSize = withPageSize(ReactBigList, 10);
```

###### `withCustomFilters(WrappedComponent: React.ReactNode, filterMap: CustomFilterMap<any>)`

```js
const WithCustomFilters = withCustomFilters(ReactBigList, {
  'Longer than 5': members => members.filter(member => member.length > 5),
});
```

###### Config options

```js
type BigListConfig<T> = {
  pageSize?: number,
  filterMap?: CustomFilterMap<T>,
  queryStringFilter?: QueryStringFilter<T>,
  sortFunctionMap?: TableSortProps<T>,
  sortFunction?: ListSortProps<T>,
};
```

## Props passed to children

**displayedMembers: T[]**

Array of currently displayed members.

**filteredMembers: T[]**

Array of members that came through filters - before pagination is applied.

**setPageNumber: (pageNumber: number) => void**

Sets current pagination page number.

**setQueryString: (queryString: string) => void**

Sets queryString.

**queryString: string**

Query string.

**activeFilters: string[]**

Array of active custom filters.

**toggleFilter: (filter: string) => void**

Toggles filter off/on by name.

**clearFilters() => void**

Turns off all custom filters.

**setSort: (sortColumn?: string) => void**

This toggles sort by columnName.

**sortDirection?: 'asc' | 'desc'**

Sort direction applied.

**sortColumn: string**

Name of the column being sorted by.

**activePage: number**

Currently active page.

**displayingFrom: number**

Start of pagination slice e.g. 50 in 50-70.

**displayingTo: number**

End of pagination slice e.g. 70 in 50-70.

**initialCount: number**

Length of members array passed in.

**filteredCount: number**

Length of filteredMembers array.

**displayedCount: number**

Length of displayedMembers array. Number of currently displayed members.

**numPages: number**

Number of pages in your collection.

**pageSize: number**

Size of one page - number of elements to be rendered on one page.
