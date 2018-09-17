import moment from 'moment';

import { SortFunction } from '..';
import { sort } from '../src/utils';
import { NUMBERS, OBJECTS, STRINGS } from './data';

describe('sort', () => {
  test('Correctly sorts strings', () => {
    expect(sort(STRINGS, 'asc')).toEqual(['azz', 'b', 'deee', 'e', 'g', 'z']);
    expect(sort(STRINGS, 'desc')).toEqual(['z', 'g', 'e', 'deee', 'b', 'azz']);
  });

  test('Correctly sorts string by length', () => {
    const sortFunction: SortFunction<any> = s => s.length;
    expect(sort(STRINGS, 'asc', undefined, { sortFunction })).toEqual([
      'g',
      'b',
      'e',
      'z',
      'azz',
      'deee',
    ]);
  });

  test('Correctly sorts numbers', () => {
    expect(sort(NUMBERS, 'asc')).toEqual([1, 2, 4, 5, 9]);
    expect(sort(NUMBERS, 'desc')).toEqual([9, 5, 4, 2, 1]);
  });

  test('Correctly sorts objects with custom function', () => {
    const sortFunction: SortFunction<any> = s => s.number;
    expect(sort(OBJECTS, 'asc', undefined, { sortFunction })).toEqual([
      { number: 1 },
      { number: 2 },
      { number: 3 },
    ]);
    expect(sort(OBJECTS, 'desc', undefined, { sortFunction })).toEqual([
      { number: 3 },
      { number: 2 },
      { number: 1 },
    ]);
  });

  test('Correctly uses the cache', () => {
    expect(sort(STRINGS, 'asc', undefined, undefined, { 'asc-': ['Random'] })).toEqual(['Random']);
  });

  test('Sort objects by column and direction', () => {
    const members = [{ name: 'Matthew' }, { name: 'Andrew' }, { name: 'Dan' }];
    expect(sort(members, 'asc', 'name')).toEqual([
      { name: 'Andrew' },
      { name: 'Dan' },
      { name: 'Matthew' },
    ]);
  });

  test('Sort objects by customSortMap', () => {
    const threeDaysAgo = moment().subtract(3, 'days');
    const today = moment();
    const dayAgo = moment().subtract(1, 'days');
    const matthew = { name: 'Matthew', created: threeDaysAgo, account: { notes: 'a' } };
    const andrew = { name: 'Andrew', created: today, account: { notes: 'd' } };
    const dan = { name: 'Dan', created: dayAgo, account: { notes: 'b' } };
    const members = [matthew, andrew, dan];

    const sortProps = {
      sortFunctionMap: {
        notes: user => user.account.notes,
      },
    };

    expect(sort(members, 'asc', 'name', sortProps)).toEqual([andrew, dan, matthew]);
    expect(sort(members, 'asc', 'created', sortProps)).toEqual([matthew, dan, andrew]);
    expect(sort(members, 'asc', 'account.notes', sortProps)).toEqual([matthew, dan, andrew]);
    expect(sort(members, 'asc', 'notes', sortProps)).toEqual([matthew, dan, andrew]);
  });

  test('Correctly saves into cache', () => {
    const cache = {};
    sort(STRINGS, 'asc', undefined, undefined, cache);
    expect(cache).toEqual({ 'asc-': ['azz', 'b', 'deee', 'e', 'g', 'z'] });
  });
});
