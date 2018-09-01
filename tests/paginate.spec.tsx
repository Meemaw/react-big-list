import { paginate } from '../src/utils';
import { STRINGS } from './data';

const baseValuees = {
  displayingFrom: 1,
  displayingTo: 1,
  activePage: 1,
  numPages: 1,
};

describe('paginate', () => {
  test('Returns default values', () => {
    expect(paginate(STRINGS, 1, {})).toEqual({
      ...baseValuees,
      slicedMembers: STRINGS,
      displayingTo: STRINGS.length,
    });
  });

  test('Correctly returns with pageSize = 1', () => {
    expect(paginate(STRINGS, 1, { pageSize: 1 })).toEqual({
      ...baseValuees,
      slicedMembers: [STRINGS[0]],
      numPages: STRINGS.length,
    });

    expect(paginate(STRINGS, 2, { pageSize: 1 })).toEqual({
      ...baseValuees,
      slicedMembers: [STRINGS[1]],
      numPages: STRINGS.length,
      displayingFrom: 2,
      displayingTo: 2,
      activePage: 2,
    });
  });

  test('Correctly returns with pageSize evenly divisible', () => {
    const pageSize = 2;

    expect(paginate(STRINGS, 1, { pageSize })).toEqual({
      ...baseValuees,
      slicedMembers: [STRINGS[0], STRINGS[1]],
      numPages: STRINGS.length / pageSize,
      displayingTo: pageSize,
    });
  });

  test('Correctly returns with pageSize not evenly divisible', () => {
    const pageSize = 4;

    expect(paginate(STRINGS, 1, { pageSize })).toEqual({
      ...baseValuees,
      slicedMembers: [STRINGS[0], STRINGS[1], STRINGS[2], STRINGS[3]],
      numPages: Math.ceil(STRINGS.length / pageSize),
      displayingTo: pageSize,
    });

    expect(paginate(STRINGS, 2, { pageSize })).toEqual({
      ...baseValuees,
      slicedMembers: [STRINGS[4], STRINGS[5]],
      numPages: Math.ceil(STRINGS.length / pageSize),
      displayingFrom: pageSize + 1,
      displayingTo: STRINGS.length,
      activePage: 2,
    });
  });
});
