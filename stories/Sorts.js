import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from 'semantic-ui-react';

import ReactBigList from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

storiesOf('ReactBigList - sorts', module)
  .add('Sorts list of stirng', () => (
    <ReactBigList members={coolStuff}>
      {data => (
        <div>
          <Button
            icon={data.sortDirection === 'asc' ? 'sort ascending' : 'sort descending'}
            content={data.sortDirection}
            onClick={data.setSort}
          />
          {renderSimple(data)}
        </div>
      )}
    </ReactBigList>
  ))

  .add('Sorts with custom function - by string length', () => (
    <ReactBigList members={coolStuff} sortProps={{ sortFunction: s => s.length }}>
      {data => (
        <div>
          <Button
            icon={data.sortDirection === 'asc' ? 'sort ascending' : 'sort descending'}
            content={data.sortDirection}
            onClick={data.setSort}
          />
          {renderSimple(data)}
        </div>
      )}
    </ReactBigList>
  ))
  .add('Sorts objects by field value', () => (
    <ReactBigList members={coolStufObjects} sortProps={{ sortFunction: stuff => stuff.name }}>
      {data => (
        <div>
          <Button
            icon={data.sortDirection === 'asc' ? 'sort ascending' : 'sort descending'}
            content={data.sortDirection}
            onClick={data.setSort}
          />
          {renderSimple({ ...data, field: 'name' })}
        </div>
      )}
    </ReactBigList>
  ));
