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

## Components

### `ReactBigList`

###### Props: ReactBigListProps

> members: T[]

Array of all your records

> children?: (childrenProps: ChildrenProps<T>) => React.ReactNode;

```js
<ReactBigList children={({pageSize, ...rest}) => <div>Big List</div>}>
```

Function accepting ChildrenProps and returning React Node.

> paginationProps?: PaginationProps - { pageSize: number }

Pagination props object containing size of rendered pages.

> sortProps?: SortProps

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

> customFilterProps?: CustomFilterProps

```js
type CustomFilterProps = {
  filterMap?: { [filter: string]: FilterFunction<T> },
};

type FilterFunction<T> = (member: T) => boolean;
```

FilterFunction takes a member and returns a boolean whether member should be in filtered collection.

> initialPageNumber?: number

Initial pagination page number to be rendered.

> initialQueryString?: string

Initial queryString to be used with filtering on initial render.

> initialActiveFilters?: string[]

List of initially active filters.

> initialSortDirection?: 'asc' | 'desc'

Initial sort direction.

> persistanceId?: string

Unique identifier to be used for data persistance between remounts.

## Higher-order components

Create higher-order-component to reuse ReactBigList configs.

### `asBigList(WrappedComponent: React.ReactNode, config?: BigListConfig<any>)`

### `withBigListConfig(config?: BigListConfig<any>)`

### `withPageSize(WrappedComponent: React.ReactNode, pageSize: number)`

### `withCustomFilters(WrappedComponent: React.ReactNode, filterMap: CustomFilterMap<any>)`

```js
type BigListConfig<T> = {
  pageSize?: number,
  filterMap?: CustomFilterMap<T>,
  queryStringFilter?: QueryStringFilter<T>,
  sortFunctionMap?: TableSortProps<T>,
  sortFunction?: ListSortProps<T>,
};
```
