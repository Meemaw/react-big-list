import { filterByQueryString } from '../src/utils';
import { NUMBERS, OBJECTS, STRINGS } from './data';

describe('filterByQueryString', () => {
  test('Correctly filters strings with no query string', () => {
    expect(filterByQueryString(NUMBERS)).toEqual(NUMBERS);
  });

  test('Correctly filters numbers with query string', () => {
    expect(filterByQueryString(NUMBERS, '9')).toEqual([9]);
  });

  test('Correctly filters strings with query string', () => {
    expect(filterByQueryString(STRINGS, 'e')).toEqual(['deee', 'e']);
    expect(filterByQueryString(STRINGS, 'ee')).toEqual(['deee']);
  });

  test('Correctly filters objects', () => {
    const filterFunction = (x, queryString) => x.number.toString() === queryString;
    expect(filterByQueryString(OBJECTS, '3', filterFunction)).toEqual([{ number: 3 }]);
    expect(filterByQueryString(OBJECTS, '9', filterFunction)).toEqual([]);
  });

  test('Correctly filters strings by inverse length', () => {
    const filterFunction = (x, queryString) => queryString.length < x.length;
    expect(filterByQueryString(STRINGS, '', filterFunction)).toEqual(STRINGS);
    expect(filterByQueryString(STRINGS, 'M', filterFunction)).toEqual(['azz', 'deee']);
    expect(filterByQueryString(STRINGS, 'MMM', filterFunction)).toEqual(['deee']);
  });

  test('Correctly uses caches', () => {
    expect(filterByQueryString(STRINGS, 'test', undefined, { 'test--': ['Test'] })).toEqual([
      'Test',
    ]);
  });

  test('Correctly saves to cache', () => {
    const cache = {};
    filterByQueryString(STRINGS, 'ee', undefined, cache);
    expect(cache).toEqual({ 'ee--': ['deee'] });
  });
});
