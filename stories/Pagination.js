import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input, Pagination } from 'semantic-ui-react';

import ReactListify from '../src';
import { getNumPages } from '../src/utils';
import { coolStuff } from './constants';
import { renderSimple } from './helpers';

class TestWrapper extends React.Component {
  state = { activePage: 1, pageSize: 2 };

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

  render() {
    let { activePage, pageSize } = this.state;

    const numPages = getNumPages(this.props.members.length, pageSize);

    activePage = numPages < activePage ? numPages : activePage;

    return (
      <div>
        {this.props.children(activePage, pageSize)}

        <Input
          label="Page size"
          placeholder="Enter page size"
          value={pageSize}
          onChange={(e, { value }) => this.setState({ pageSize: value })}
          type="number"
        />
        <Pagination
          style={{ marginLeft: '30px' }}
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={numPages}
          size="mini"
        />
      </div>
    );
  }
}

storiesOf('ReactListify - pagination', module).add('default', () => {
  const members = coolStuff;

  return (
    <TestWrapper members={members}>
      {(pageNumber, pageSize) => (
        <ReactListify members={members} paginationProps={{ pageNumber, pageSize }}>
          {data => renderSimple(data)}
        </ReactListify>
      )}
    </TestWrapper>
  );
});
