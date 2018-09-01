import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from 'semantic-ui-react';

import ReactListify from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

class TestWrapper extends React.Component {
  state = { sortDirection: 'asc' };
  render() {
    const { sortDirection } = this.state;
    return (
      <div>
        <Button
          icon={sortDirection === 'asc' ? 'sort ascending' : 'sort descending'}
          content={this.state.sortDirection}
          onClick={() => this.setState({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })}
        />
        {this.props.children(sortDirection)}
      </div>
    );
  }
}

storiesOf('ReactListify - sorts', module)
  .add('Sorts list of stirng', () => (
    <TestWrapper>
      {sortDirection => (
        <ReactListify members={coolStuff} sortProps={{ sortDirection }}>
          {data => renderSimple(data)}
        </ReactListify>
      )}
    </TestWrapper>
  ))

  .add('Sorts with custom function - by string length', () => (
    <TestWrapper>
      {sortDirection => (
        <ReactListify
          members={coolStuff}
          sortProps={{ sortDirection, sortFunction: s => s.length }}
        >
          {data => renderSimple(data)}
        </ReactListify>
      )}
    </TestWrapper>
  ))
  .add('Sorts objects by field value', () => (
    <TestWrapper>
      {sortDirection => (
        <ReactListify
          members={coolStufObjects}
          sortProps={{ sortDirection, sortFunction: stuff => stuff.name }}
        >
          {data => renderSimple({ ...data, field: 'name' })}
        </ReactListify>
      )}
    </TestWrapper>
  ));
