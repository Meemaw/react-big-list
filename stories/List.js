import * as React from 'react';
import { List, Pagination, Segment } from 'semantic-ui-react';

import ReactBigList, { withCustomFilters, withPageSize } from '../src';
import { renderCombinedHeader } from './helpers';
import { customFilterMap, filterOptions } from './listFilters';

let Enhanced = withCustomFilters(ReactBigList, customFilterMap);
Enhanced = withPageSize(Enhanced, 10);

class ListWrapper extends React.Component {
  render() {
    return (
      <Enhanced members={this.props.members} persistanceId={this.props.persistanceId}>
        {({
          displayedMembers,
          numPages,
          filteredCount,
          displayingFrom,
          displayingTo,
          activePage,
          queryString,
          sortDirection,
          activeFilters,
          setPageNumber,
          setSort,
          setQueryString,
          toggleFilter,
        }) => (
          <React.Fragment>
            {renderCombinedHeader({
              displayingFrom,
              displayingTo,
              filteredCount,
              sortDirection,
              setSort,
              filterOptions,
              activeFilters,
              toggleFilter,
              queryString,
              setQueryString,
              renderAscendingButton: true,
            })}

            <Segment>
              <List>
                {displayedMembers.map(member => {
                  return (
                    <List.Item key={member}>
                      <List.Icon name={this.props.icon || member.toLowerCase()} />
                      <List.Content>{member}</List.Content>
                    </List.Item>
                  );
                })}
              </List>

              <Pagination
                activePage={activePage}
                totalPages={numPages}
                onPageChange={(e, { activePage }) => setPageNumber(activePage)}
                size="mini"
              />
            </Segment>
          </React.Fragment>
        )}
      </Enhanced>
    );
  }
}

export default ListWrapper;
