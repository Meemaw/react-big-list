import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input, Pagination } from 'semantic-ui-react';

import ReactBigList from '../src';
import { coolStuff } from './constants';
import { renderSimple } from './helpers';

class TestWrapper extends React.Component {
  state = { pageSize: 2 };

  render() {
    const { pageSize } = this.state;
    return (
      <div>
        <Input
          label="Page size"
          placeholder="Enter page size"
          value={pageSize}
          onChange={(e, { value }) => this.setState({ pageSize: value })}
          type="number"
        />
        {this.props.children({ pageSize })}
      </div>
    );
  }
}

storiesOf('ReactBigList - pagination', module).add('default', () => {
  const members = coolStuff;

  return (
    <TestWrapper members={members}>
      {({ pageSize }) => (
        <ReactBigList members={members} paginationProps={{ pageSize }}>
          {props => {
            return (
              <div>
                {renderSimple(props)}
                <Pagination
                  style={{ marginLeft: '30px' }}
                  activePage={props.activePage}
                  onPageChange={(e, { activePage }) => props.setPageNumber(activePage)}
                  totalPages={props.numPages}
                  size="mini"
                />
              </div>
            );
          }}
        </ReactBigList>
      )}
    </TestWrapper>
  );
});
