import { applyFilters } from '../src/utils';
import { STRINGS } from './data';

describe('Custom filters', () => {
  test('Applies no filters', () => {
    expect(applyFilters(STRINGS, [])).toEqual(STRINGS);
  });

  test('Applies 1 filter', () => {
    const filterMap = { 'length > 2': members => members.filter(x => x.length > 2) };
    expect(applyFilters(STRINGS, ['length > 2'], { filterMap })).toEqual(['azz', 'deee']);
  });

  test('Applies multiple filters', () => {
    const filterMap = {
      'length > 2': members => members.filter(x => x.length > 2),
      'starts with a': members => members.filter(x => x.startsWith('a')),
    };
    expect(applyFilters(STRINGS, ['length > 2', 'starts with a'], { filterMap })).toEqual(['azz']);
  });
});
