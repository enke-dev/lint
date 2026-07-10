import { fixupPluginRules } from '@eslint/compat';
import eslintPluginJs from '@eslint/js';
import type { Linter } from 'eslint';
import type { Config } from 'eslint/config';
import { defineConfig } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginImportExtension from 'eslint-plugin-import-extensions';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintTs from 'typescript-eslint';

export type FlatConfig = ReturnType<typeof defineConfig>;

// `eslint/config` only re-exports the flattened `Config`; the extends-capable variant
// accepted inside `defineConfig()` is derived from its parameter type (dropping the
// nested-array branch of the InfiniteArray it expects).
export type ConfigWithExtends = Exclude<
  Parameters<typeof defineConfig>[number],
  readonly unknown[]
>;

// shared parser options
export const parserOptions: Linter.ParserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};

export function setTsConfigRootDir(dir: string): Config {
  return { languageOptions: { parserOptions: { project: true, tsconfigRootDir: dir } } };
}

// shared import-sort groups
export const importSortGroups = [
  // Side effect imports.
  ['^\\u0000'],
  // Node.js builtins prefixed with `node:`.
  ['^node:'],
  // Packages.
  // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
  ['^@?\\w'],
  // Absolute imports and other imports such as Vue-style `@/foo`.
  // Anything not matched in another group.
  ['^'],
  // Relative imports.
  // Anything that starts with a dot.
  ['^\\.'],
  // Assetic imports, most likely inline loaded style files for lit components
  // or raw loaded files like images, meta data or fonts.
  ['\\?(inline|raw)$'],
];

// JavaScript / TypeScript base config, parametrised by runtime target.
//
// Relative imports always carry the emitted `.js` extension: tsc emits `.js`, and
// runtimes that execute TypeScript directly (bun, ts-node, --experimental-strip-types)
// resolve a `.js` specifier back to the neighbouring `.ts` source anyway. `target`
// therefore only switches the resolver, so bun builtins (`bun:test`, `bun:sqlite`) are
// recognised rather than flagged as unresolved.
export function typescript(runtime: 'node' | 'bun'): ConfigWithExtends {
  return {
    files: ['**/*.js', '**/*.ts'],
    extends: [
      eslintPluginJs.configs.recommended,
      ...eslintTs.configs.strict,
      ...eslintTs.configs.stylistic,
      eslintPluginImport.flatConfigs.recommended,
    ],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
      'import-extensions': fixupPluginRules(eslintPluginImportExtension),
    },
    languageOptions: { parserOptions },
    settings: {
      'import/resolver': {
        typescript: runtime === 'bun' ? { bun: true, node: true } : { node: true },
      },
    },
    rules: {
      // formatting
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      curly: 'error',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-console': 'error',

      // import sorting
      'simple-import-sort/imports': ['error', { groups: importSortGroups }],
      'simple-import-sort/exports': 'error',
      // import extensions
      'import-extensions/require-extensions': ['error', { expectedExtensions: ['js'] }],
      'import-extensions/require-index': ['error', { expectedExtensions: ['js'] }],

      // import rules
      'import/enforce-node-protocol-usage': ['error', 'always'], // enforce node: import prefix
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'], // type imports
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'always' }],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      // unused imports
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  };
}
