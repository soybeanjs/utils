# @soybeanjs/utils

English | [简体中文](./README.md)

A collection of useful utility functions for JavaScript and TypeScript projects.

## Features

- 🚀 Lightweight and zero dependencies
- 📦 ESM format
- 🔧 Full TypeScript type support
- 🎯 Common utility functions
- 💾 Browser storage wrapper

## Installation

```bash
# Using pnpm
pnpm add @soybeanjs/utils

# Using npm
npm install @soybeanjs/utils

# Using yarn
yarn add @soybeanjs/utils
```

## Usage

### String Utilities

Provides various string case conversion functions:

```typescript
import { kebabCase, pascalCase, camelCase, snakeCase } from '@soybeanjs/utils';

// Convert to kebab-case
kebabCase('helloWorld'); // 'hello-world'

// Convert to PascalCase
pascalCase('hello-world'); // 'HelloWorld'

// Convert to camelCase
camelCase('hello-world'); // 'helloWorld'

// Convert to snake_case
snakeCase('helloWorld'); // 'hello_world'
```

### Object Utilities

Type-safe object manipulation functions:

```typescript
import { keysOf, entriesOf, valuesOf } from '@soybeanjs/utils';

const obj = { name: 'John', age: 30 };

// Get object keys (with type inference)
const keys = keysOf(obj); // ('name' | 'age')[]

// Get object entries (with type inference)
const entries = entriesOf(obj); // ['name' | 'age', string | number][]

// Get object values (with type inference)
const values = valuesOf(obj); // (string | number)[]
```

### Storage Utilities

Type-safe wrapper for browser storage (localStorage and sessionStorage):

```typescript
import { createStorage } from '@soybeanjs/utils';

// Define your storage data structure
interface StorageData {
  token: string;
  userInfo: {
    name: string;
    age: number;
  };
}

// Create a localStorage instance
const storage = createStorage<StorageData>('local', 'my-app-');

// Set storage
storage.set('token', 'abc123');
storage.set('userInfo', { name: 'John', age: 30 });

// Get storage
const token = storage.get('token'); // string | null
const userInfo = storage.get('userInfo'); // { name: string; age: number } | null

// Remove storage
storage.remove('token');

// Clear all storage
storage.clear();
```

## API Documentation

### String Utilities

- `kebabCase(str: string): string` - Convert to kebab-case format
- `pascalCase(str: string): string` - Convert to PascalCase format
- `camelCase(str: string): string` - Convert to camelCase format
- `snakeCase(str: string): string` - Convert to snake_case format

### Object Utilities

- `keysOf<T>(record: T): (keyof T)[]` - Get object keys (type-safe)
- `entriesOf<T>(record: T): [keyof T, T[keyof T]][]` - Get object entries (type-safe)
- `valuesOf<T>(record: T): T[keyof T][]` - Get object values (type-safe)

### Storage Utilities

- `createStorage<T>(type: StorageType, storagePrefix: string)` - Create a type-safe storage instance
  - `type`: `'local'` or `'session'`
  - `storagePrefix`: Storage key prefix
  - Returns an object with the following methods:
    - `set<K>(key: K, value: T[K]): void` - Set storage value
    - `get<K>(key: K): T[K] | null` - Get storage value
    - `remove(key: keyof T): void` - Remove storage entry
    - `clear(): void` - Clear all storage

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm typecheck
```

## License

[MIT](./LICENSE) License © 2026 [Soybean](https://github.com/soybeanjs)
