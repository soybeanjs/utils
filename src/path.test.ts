import { describe, expect, it } from 'vitest';

import { isMatchParamRoute } from './path';

describe('path utils', () => {
  it('matches static and dynamic segments', () => {
    expect(isMatchParamRoute('/user/:id/profile', '/user/123/profile')).toBe(true);
  });

  it('supports optional params', () => {
    expect(isMatchParamRoute('/user/:id?', '/user')).toBe(true);
    expect(isMatchParamRoute('/user/:id?', '/user/123')).toBe(true);
  });

  it('rejects paths shorter than required segments', () => {
    expect(isMatchParamRoute('/user/:id/profile', '/user/123')).toBe(false);
  });

  it('rejects paths longer than route segments', () => {
    expect(isMatchParamRoute('/user/:id', '/user/123/profile')).toBe(false);
  });

  it('rejects unmatched static segments', () => {
    expect(isMatchParamRoute('/user/:id/profile', '/user/123/settings')).toBe(false);
  });
});
