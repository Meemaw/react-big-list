import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from 'semantic-ui-react';

import ReactListify from '../src';
import { coolStuff, coolStufObjects } from './constants';
import { renderSimple } from './helpers';

class TestWrapper extends React.Component {
  state = { queryString: '' };
  render() {
    return (
      <div>
        <Input
          placeholder="Enter query string"
          value={this.state.queryString}
          onChange={(e, { value }) => this.setState({ queryString: value })}
        />
        {this.props.children(this.state.queryString)}
      </div>
    );
  }
}

storiesOf('ReactListify - query filters', module)
  .add('Filter list of strings', () => (
    <TestWrapper>
      {queryString => (
        <ReactListify members={coolStuff} queryString={queryString}>
          {data => renderSimple(data)}
        </ReactListify>
      )}
    </TestWrapper>
  ))

  .add('Filters list of numbers', () => (
    <TestWrapper>
      {queryString => (
        <ReactListify members={[1, 5, 10, 15, 501]} queryString={queryString}>
          {data => renderSimple(data)}
        </ReactListify>
      )}
    </TestWrapper>
  ))
  .add('Custom filter function', () => (
    <TestWrapper>
      {queryString => (
        <ReactListify
          members={coolStufObjects}
          queryString={queryString}
          queryStringFilter={(member, queryString) => member.name.length > queryString.length}
        >
          {data => renderSimple({ ...data, field: 'name' })}
        </ReactListify>
      )}
    </TestWrapper>
  ));
