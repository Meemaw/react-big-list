import ReactBigList, { withCustomFilters } from '../src';

export const customFilterMap = {
  'Positive last 1h': members => members.filter(coin => coin.quotes.USD.percent_change_1h > 0),
  'Negative last 1h': members => members.filter(coin => coin.quotes.USD.percent_change_1h < 0),
  'Top 10': members => members.filter(coin => coin.rank <= 10),
  'Price > 100$': members => members.filter(coin => coin.quotes.USD.price >= 100),
};

export const filterOptions = Object.keys(customFilterMap).map(filterName => ({
  text: filterName,
  key: filterName,
  value: filterName,
}));

export default withCustomFilters(ReactBigList, customFilterMap);
