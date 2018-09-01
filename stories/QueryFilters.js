import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from 'semantic-ui-react';

import ReactListify from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

storiesOf('ReactListify - query filters', module)
  .add('Filter list of strings', () => (
    <ReactListify members={coolStuff}>
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
    </ReactListify>
  ))

  .add('Filters list of numbers', () => (
    <ReactListify members={[1, 5, 10, 15, 501]}>
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
    </ReactListify>
  ))
  .add('Custom filter function', () => (
    <ReactListify
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
    </ReactListify>
  ));
