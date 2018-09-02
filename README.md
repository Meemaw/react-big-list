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

  <a href='https://coveralls.io/github/Meemaw/react-big-list?branch=master'>
    <img
      src='https://coveralls.io/repos/github/Meemaw/react-big-list/badge.svg?branch=master' />
  </a>

  <a href="https://github.com/Meemaw/react-big-list/blob/master/LICENSE">
    <img src="https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667" />

  </a>

  <a href="https://github.com/Meemaw/Photomy#contributors">
    <img 
      src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" />
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

React Big List is smart wrapper component for handling large collections on client-side.

### [Features][features]

- Sorting
- Query filtering
- Custom filters
- Pagination
- Persistance between remounts
- Internal caching 💥
- Responsiveness (no UI blocking) 💥

### [Why][why]

Sometimes backend API's doesn't support features like sorting/pagination/filtering. Implementing those operations on client side can lead to many edge-case errors which are easily overlooked. Moreover, performing those operations on huge collections is very expensive and may lead UI freezes and have sever impact on user experience. React Big List implements generic logic of generic logic of pagination, sorting, filtering and is thoroughly [tested][tests].

### [Live Playground][playground]

For examples of the datepicker in action, go to [https://Meemaw.github.io/react-big-list/][storybook-link].

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
        displayedMembers,
        sortColumn,
        sortDirection,
        setSort,
        ...rest
      }) => <div>{`Members sorted by ${sortColumn} in ${sortDirection} direction.`}</div>}
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

### [Contributors][contributors]

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/8524109?s=460&v=4" width="100px;"/><br /><sub><b>Meemaw</b></sub>](https://github.com/Meemaw)<br />[💻](https://github.com/Meemaw/react-big-list/commits?author=Meemaw "Code") [📖](https://github.com/Meemaw/react-big-list/commits?author=Meemaw "Documentation") [🚇](#infra-stereobooster "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/Meemaw/react-big-list/commits?author=Meemaw "Tests")
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

[about]: https://github.com/Meemaw/react-big-list#about
[features]: https://github.com/Meemaw/react-big-list#features
[why]: https://github.com/Meemaw/react-big-list#why
[tests]: https://github.com/Meemaw/react-big-list/tree/master/tests
[usage]: https://github.com/Meemaw/react-big-list#usage
[installation]: https://github.com/Meemaw/react-big-list#installation
[testing]: https://github.com/Meemaw/react-big-list#testing
[usage]: https://github.com/Meemaw/react-big-list#usage
[playground]: https://github.com/Meemaw/react-big-list#playground
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[contributors]: https://github.com/Meemaw/react-big-list#contributors
[all-contributors]: https://github.com/kentcdodds/all-contributors
[storybook-link]: https://meemaw.github.io/react-big-list/?selectedKind=ReactBigList%20-%20combined&selectedStory=Async%20crypto%20table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
