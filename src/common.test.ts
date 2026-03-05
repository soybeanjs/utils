import { describe, expect, it } from 'vitest';

import { entriesOf, isNullish, keysOf, valuesOf } from './common';

describe('common utils', () => {
  it('keysOf returns typed keys', () => {
    const record = { a: 1, b: 2 };
    expect(keysOf(record)).toEqual(['a', 'b']);
  });

  it('entriesOf returns key-value tuples', () => {
    const record = { a: 1, b: 2 };
    expect(entriesOf(record)).toEqual([
      ['a', 1],
      ['b', 2]
    ]);
  });

  it('valuesOf returns typed values', () => {
    const record = { a: 1, b: 2 };
    expect(valuesOf(record)).toEqual([1, 2]);
  });

  it('isNullish checks null and undefined only', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(false)).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
  });
});
