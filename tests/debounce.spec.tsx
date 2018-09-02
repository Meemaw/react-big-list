import { estimateDebounceWait } from '../src/utils';

describe('estimateDebounceWait', () => {
  test('Minimal wait time', () => {
    expect(estimateDebounceWait(0)).toBe(20);
  });

  test('1000 elements', () => {
    expect(estimateDebounceWait(1000)).toBe(22);
  });

  test('10000 elements', () => {
    expect(estimateDebounceWait(10000)).toBe(40);
  });

  test('100000 elements', () => {
    expect(estimateDebounceWait(100000)).toBe(220);
  });

  test('1000000 elements', () => {
    expect(estimateDebounceWait(1000000)).toBe(280);
  });
});
