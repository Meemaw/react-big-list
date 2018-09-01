import * as React from 'react';
import { Label, Loader, Menu, Pagination, Table } from 'semantic-ui-react';

import ReactListify, { withCustomFilters, withPageSize } from '../src';
import { renderCombinedHeader } from './helpers';
import { customFilterMap, filterOptions } from './tableFilters';

let Enhanced = withCustomFilters(ReactListify, customFilterMap);
Enhanced = withPageSize(Enhanced, 9);

const headerOptions = [
  { text: 'Name', value: 'name' },
  { text: 'Symbol', value: 'symbol' },
  { text: 'Rank', value: 'rank' },
  { text: 'Price $', value: 'quotes.USD.price' },
  { text: 'Volume $', value: 'quotes.USD.volume_24h' },
  { text: 'Change 1h', value: 'quotes.USD.percent_change_1h' },
];

class TableWrapper extends React.Component {
  state = {
    coins: [],
    loading: true,
  };

  handleResponse(data) {
    const coins = Object.keys(data).reduce((accList, coinId) => {
      accList.push(data[coinId]);
      return accList;
    }, []);
    this.setState({ coins, loading: false });
  }

  async componentDidMount() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?sort=volume_24h')
      .then(resp => resp.json())
      .then(resp => this.handleResponse(resp.data));
  }

  queryStringFilter = (coin, queryString) => {
    const query = queryString.trim();
    return coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query);
  };

  render() {
    const { coins, loading } = this.state;
    return (
      <Enhanced members={coins} queryStringFilter={this.queryStringFilter}>
        {({
          activePage,
          numPages,
          members,
          displayingFrom,
          displayingTo,
          filteredCount,
          setPageNumber,
          queryString,
          activeFilters,
          toggleFilter,
          setQueryString,
          sortColumn,
          sortDirection,
          setSort,
        }) => {
          const semanticDirection = sortDirection === 'asc' ? 'ascending' : 'descending';
          return (
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
              })}
              <Table celled sortable>
                <Table.Header>
                  <Table.Row>
                    {headerOptions.map(headerOption => (
                      <Table.HeaderCell
                        key={headerOption.value}
                        sorted={sortColumn === headerOption.value ? semanticDirection : null}
                        onClick={() => setSort(headerOption.value)}
                      >
                        {headerOption.text}
                      </Table.HeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {loading ? (
                    <Loader />
                  ) : (
                    members.map(coin => {
                      const change1h = coin.quotes.USD.percent_change_1h;
                      return (
                        <Table.Row key={coin.id}>
                          <Table.Cell>
                            <Label ribbon>{coin.name}</Label>
                          </Table.Cell>
                          <Table.Cell>{coin.symbol}</Table.Cell>
                          <Table.Cell>{coin.rank}</Table.Cell>
                          <Table.Cell>{coin.quotes.USD.price.toFixed(4)}</Table.Cell>
                          <Table.Cell>{coin.quotes.USD.volume_24h.toFixed(0)}</Table.Cell>
                          <Table.Cell
                            style={{ color: change1h < 0 ? 'red' : 'green' }}
                          >{`${change1h} %`}</Table.Cell>
                        </Table.Row>
                      );
                    })
                  )}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="6">
                      <Menu floated="right" pagination>
                        <Pagination
                          activePage={activePage}
                          totalPages={numPages}
                          onPageChange={(e, { activePage }) => setPageNumber(activePage)}
                          size="mini"
                        />
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </React.Fragment>
          );
        }}
      </Enhanced>
    );
  }
}

export default TableWrapper;
