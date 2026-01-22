/**
 * Convert string to kebab-case format (短横线命名)
 *
 * @example
 *   toKebabCase('helloWorld'); // 'hello-world'
 *   toKebabCase('HelloWorld'); // 'hello-world'
 *
 * @param str - The string to convert
 * @returns String in kebab-case format
 */
export const kebabCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Convert string to PascalCase format (帕斯卡命名)
 *
 * @example
 *   toPascalCase('hello-world'); // 'HelloWorld'
 *   toPascalCase('hello_world'); // 'HelloWorld'
 *
 * @param str - The string to convert
 * @returns String in PascalCase format
 */
export const pascalCase = (str: string) => str.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());

/**
 * Convert string to camelCase format (驼峰命名)
 *
 * @example
 *   toCamelCase('hello-world'); // 'helloWorld'
 *   toCamelCase('hello_world'); // 'helloWorld'
 *
 * @param str - The string to convert
 * @returns String in camelCase format
 */
export const camelCase = (str: string) => str.replace(/(-\w)/g, char => char.replace('-', '').toUpperCase());

/**
 *  Convert string to snake_case format (蛇形命名)
 *
 * @example
 *   toSnakeCase('helloWorld'); // 'hello_world'
 *   toSnakeCase('HelloWorld'); // 'hello_world'
 * @param str
 */
export const snakeCase = (str: string) => str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
