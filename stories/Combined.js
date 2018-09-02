import { storiesOf } from '@storybook/react';
import React from 'react';

import { coolStuff } from './constants';
import ListWrapper from './List';
import TableWrapper from './Table';

const generateRandomString = () => {
  return Math.random().toString(36);
};

const generateRandomMembers = num => {
  return Array.from(Array(num).keys()).map(generateRandomString);
};

storiesOf('ReactBigList - combined', module)
  .add('List - 26 items', () => {
    return <ListWrapper members={coolStuff} />;
  })
  .add('List - 10000 items', () => {
    return <ListWrapper members={generateRandomMembers(10000)} icon="random" />;
  })
  .add('List - 100000 items', () => {
    return <ListWrapper members={generateRandomMembers(100000)} icon="random" />;
  })
  .add('List - 1 million items', () => {
    return <ListWrapper members={generateRandomMembers(1000000)} icon="random" />;
  })
  .add('Async crypto table', () => {
    return <TableWrapper />;
  });
