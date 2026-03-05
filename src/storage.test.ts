import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createStorage } from './storage';

type MemoryStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const createMemoryStorage = (): MemoryStorage => {
  const map = new Map<string, string>();

  return {
    getItem(key) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key, value) {
      map.set(key, value);
    },
    removeItem(key) {
      map.delete(key);
    },
    clear() {
      map.clear();
    }
  };
};

describe('storage utils', () => {
  beforeEach(() => {
    const localStorage = createMemoryStorage();
    const sessionStorage = createMemoryStorage();

    vi.stubGlobal('window', { localStorage, sessionStorage });
  });

  it('sets and gets value from localStorage', () => {
    const storage = createStorage<{ token: string }>('local', 'app_');

    storage.set('token', 'abc');

    expect(storage.get('token')).toBe('abc');
  });

  it('removes value from storage', () => {
    const storage = createStorage<{ token: string }>('session', 'app_');

    storage.set('token', 'abc');
    storage.remove('token');

    expect(storage.get('token')).toBeNull();
  });

  it('returns null and clears invalid json', () => {
    const storage = createStorage<{ token: string }>('local', 'app_');

    window.localStorage.setItem('app_token', '{invalid json');

    expect(storage.get('token')).toBeNull();
    expect(window.localStorage.getItem('app_token')).toBeNull();
  });
});
