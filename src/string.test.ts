import { describe, expect, it } from 'vitest';

import { camelCase, kebabCase, pascalCase, snakeCase } from './string';

describe('string case conversion', () => {
  describe('kebabCase', () => {
    it('converts camelCase and PascalCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });

    it('keeps kebab-case string unchanged', () => {
      expect(kebabCase('hello-world')).toBe('hello-world');
    });

    it('handles numbers in word boundaries', () => {
      expect(kebabCase('version2Value')).toBe('version2-value');
    });
  });

  describe('pascalCase', () => {
    it('converts kebab-case and snake_case to PascalCase', () => {
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello_world')).toBe('HelloWorld');
    });

    it('converts mixed separators to PascalCase', () => {
      expect(pascalCase('hello-world_test')).toBe('HelloWorldTest');
    });

    it('capitalizes leading word character', () => {
      expect(pascalCase('helloWorld')).toBe('HelloWorld');
      expect(pascalCase('1hello-world')).toBe('1helloWorld');
    });
  });

  describe('camelCase', () => {
    it('converts kebab-case and snake_case to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
    });

    it('converts mixed separators to camelCase', () => {
      expect(camelCase('hello-world_test')).toBe('helloWorldTest');
    });

    it('keeps existing camelCase unchanged', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('snakeCase', () => {
    it('converts camelCase and PascalCase to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('HelloWorld')).toBe('hello_world');
    });

    it('keeps snake_case string unchanged', () => {
      expect(snakeCase('hello_world')).toBe('hello_world');
    });

    it('handles numbers in word boundaries', () => {
      expect(snakeCase('version2Value')).toBe('version2_value');
    });
  });
});
