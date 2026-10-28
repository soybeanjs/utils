import type { StorageType } from './types';

/** Resolve the web storage on the client, `null` during SSR (客户端解析存储，SSR 下返回 null) */
function resolveStorage(type: StorageType): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return type === 'session' ? window.sessionStorage : window.localStorage;
}

/**
 * Create storage (创建存储)
 *
 * @param type Storage type (存储类型)
 * @param storagePrefix Storage prefix (存储前缀)
 */
export function createStorage<T extends object>(type: StorageType, storagePrefix: string) {
  const getKey = (key: keyof T) => `${storagePrefix}${String(key)}`;

  const storage = {
    /**
     * Set storage (设置存储)
     *
     * @param key Storage key (存储键)
     * @param value Storage value (存储值)
     */
    set<K extends keyof T>(key: K, value: T[K]) {
      const sKey = getKey(key);

      const stg = resolveStorage(type);
      if (!stg) {
        return;
      }

      const json = JSON.stringify(value);

      try {
        stg.setItem(sKey, json);
      } catch {
        stg.removeItem(sKey);
        // eslint-disable-next-line no-console
        console.warn(`[createStorage] Failed to set storage for key "${sKey}".`);
      }
    },
    /**
     * Get storage (获取存储)
     *
     * @param key Storage key (存储键)
     */
    get<K extends keyof T>(key: K): T[K] | null {
      const sKey = getKey(key);

      const stg = resolveStorage(type);
      if (!stg) {
        return null;
      }

      const json = stg.getItem(sKey);
      if (json) {
        let storageData: T[K] | null = null;

        try {
          storageData = JSON.parse(json);
        } catch {}

        // storageData may be `false` if it is boolean type
        if (storageData !== null) {
          return storageData as T[K];
        }
      }

      stg.removeItem(sKey);

      return null;
    },
    /**
     * Remove storage (移除存储)
     *
     * @param key Storage key (存储键)
     */
    remove(key: keyof T) {
      resolveStorage(type)?.removeItem(getKey(key));
    },
    /**
     * Clear all storage (清空所有存储)
     */
    clear() {
      resolveStorage(type)?.clear();
    }
  };

  return storage;
}
