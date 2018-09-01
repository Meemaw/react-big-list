import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from 'semantic-ui-react';

import ReactListify from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

storiesOf('ReactListify - sorts', module)
  .add('Sorts list of stirng', () => (
    <ReactListify members={coolStuff}>
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
    </ReactListify>
  ))

  .add('Sorts with custom function - by string length', () => (
    <ReactListify members={coolStuff} sortProps={{ sortFunction: s => s.length }}>
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
    </ReactListify>
  ))
  .add('Sorts objects by field value', () => (
    <ReactListify members={coolStufObjects} sortProps={{ sortFunction: stuff => stuff.name }}>
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
    </ReactListify>
  ));
