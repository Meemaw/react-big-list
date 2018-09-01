<!-- Name -->

<h1 align="center">
  <a href="https://github.com/Meemaw/react-big-list">React Big List</a>
</h1>

<!-- Badges -->

<p align="center">

  <a href="https://travis-ci.org/Meemaw/react-big-list">
    <img
       src="https://api.travis-ci.org/Meemaw/react-big-list.svg?branch=master" />
  </a>

  <a href='https://coveralls.io/github/Meemaw/react-big-list?branch=feature%2Fcoveralls_integration'>
      <img 
        src='https://coveralls.io/repos/github/Meemaw/react-big-list/badge.svg?branch=feature%2Fcoveralls_integration'/>
  </a>

  <a href="http://makeapullrequest.com">
    <img
         src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
  </a>

  <a href="https://opensource.org/">
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"/>
  </a>

</span>

### [About][about]

React Big List is smart wrapper component for your big collections on client-side.

### [Motivation][motivation]

Sometimes backend API's doesn't support features like sorting/pagination/filtering. Implementing this on client side can lead to many edge-case errors which are easily overlooked. Moreover, performing those operations on huge collections is very expensive and may have sever impact on user experience. React Big List implements generic logic of generic logic of pagination, sorting, filtering and is thourougly [tested][tests]. It also uses caching internally to reuse already computed (sorted/filtered) sub-collections.

### [Live Playground][playground]

For examples of the datepicker in action, go to https://Meemaw.github.io/react-big-list/.

OR

To run that demo on your own computer:

- Clone this repository
- `npm install`
- `npm run storybook`
- Visit http://localhost:6006/

### [Usage][usage]

Import `ReactBigList` in your React component:

```javascript static
import ReactBigList from 'react-big-list';
```

Use props provided by `react-big-list` to render your collection.

```javascript static
render() {
  return (
    <ReactBigList members={['React', 'Angular', 'Ember']} paginationProps={{ pageSize: 2 }}>
      {({
        members,
        queryString,
        setQueryString,
        sortColumn,
        sortDirection,
        setSort,
        displayedCount,
        initialCount,
        ...rest
      }) => <div>{`${displayedCount} members out of ${initialCount} displayed.`}</div>}
    </ReactBigList>
  )
}
```

### [Installation][installation]

Install it from npm and include it in your React build process (using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), etc).

```bash
npm install --save react-big-list
```

or:

```bash
yarn add react-big-list
```

### [Testing][testing]

```bash
yarn test
```

[about]: https://github.com/Meemaw/react-big-list#about
[motivation]: https://github.com/Meemaw/react-big-list#motivation
[tests]: https://github.com/Meemaw/react-big-list/tree/master/tests
[usage]: https://github.com/Meemaw/react-big-list#usage
[installation]: https://github.com/Meemaw/react-big-list#installation
[testing]: https://github.com/Meemaw/react-big-list#testing
[usage]: https://github.com/Meemaw/react-big-list#usage
