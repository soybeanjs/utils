import { describe, expect, expectTypeOf, it } from 'vitest';

import { entriesOf, filterNullish, isNullish, keysOf, valuesOf } from './common';

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

  it('filterNullish removes nullish values and narrows the element type', () => {
    const values = [1, null, 2, undefined, 3] as const;
    const filtered = filterNullish(values);

    expect(filtered).toEqual([1, 2, 3]);
    expectTypeOf(filtered).toEqualTypeOf<Array<1 | 2 | 3>>();
  });
});
