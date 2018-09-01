import { storiesOf } from '@storybook/react';
import React from 'react';

import ListWrapper from './List';
import TableWrapper from './Table';

storiesOf('ReactBigList - combined', module)
  .add('List', () => {
    return <ListWrapper />;
  })
  .add('Async table', () => {
    return <TableWrapper />;
  });
