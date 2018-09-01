import ReactListify, { withCustomFilters } from '../src';

export const customFilterMap = {
  'Longer than 5': members => members.filter(member => member.length > 5),
  'Start with r': members => members.filter(member => member.toLowerCase().startsWith('r')),
  'Is the best': members => members.filter(member => member === 'React'),
};

export const filterOptions = Object.keys(customFilterMap).map(filterName => ({
  text: filterName,
  key: filterName,
  value: filterName,
}));

export default withCustomFilters(ReactListify, customFilterMap);
