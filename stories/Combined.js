import { storiesOf } from '@storybook/react';
import React from 'react';

import ListWrapper from './List';
import TableWrapper from './Table';

storiesOf('ReactListify - combined', module)
  .add('List', () => {
    return <ListWrapper />;
  })
  .add('Table', () => {
    return <TableWrapper />;
  });
