import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from 'semantic-ui-react';

import ReactBigList from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

storiesOf('ReactBigList - query filters', module)
  .add('Filter list of strings', () => (
    <ReactBigList members={coolStuff}>
      {data => (
        <div>
          <Input
            placeholder="Enter query string"
            value={data.queryString}
            onChange={(e, { value }) => data.setQueryString(value)}
          />
          {renderSimple(data)}
        </div>
      )}
    </ReactBigList>
  ))

  .add('Filters list of numbers', () => (
    <ReactBigList members={[1, 5, 10, 15, 501]}>
      {data => (
        <div>
          <Input
            placeholder="Enter query string"
            value={data.queryString}
            onChange={(e, { value }) => data.setQueryString(value)}
          />
          {renderSimple(data)}
        </div>
      )}
    </ReactBigList>
  ))
  .add('Custom filter function (all objects with name longer than querystring)', () => (
    <ReactBigList
      members={coolStufObjects}
      queryStringFilter={(member, queryString) => member.name.length > queryString.length}
    >
      {data => (
        <div>
          <Input
            placeholder="Enter query string"
            value={data.queryString}
            onChange={(e, { value }) => data.setQueryString(value)}
          />
          {renderSimple({ ...data, field: 'name' })}
        </div>
      )}
    </ReactBigList>
  ));
