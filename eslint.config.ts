/// <reference types="./eslint-plugin-import.d.ts" />

import eslintJs from '@eslint/js';
import eslintJson from '@eslint/json';
import type { Linter } from 'eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginLit from 'eslint-plugin-lit';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginWC from 'eslint-plugin-wc';
import eslintTs from 'typescript-eslint';

export default eslintTs.config(
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintPluginImport.flatConfigs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'lib/'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: true,
        sourceType: 'module',
        tsconfigRootDir: './',
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    rules: {
      // formatting
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
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
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // TODO: not yet shipped in 2.31.0
      // 'import/enforce-node-protocol-usage': ['error', 'always'], // enforce node: import prefix
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
  },
  // json files
  {
    ...eslintJson.configs.recommended,
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    rules: { 'no-irregular-whitespace': 'off' },
  },
  // lit web components
  {
    files: ['**/*.component.ts', '**/*.component.tsx'],
    extends: [
      eslintPluginWC.configs['flat/recommended'],
      eslintPluginLit.configs['flat/recommended'],
    ],
  },
) as Linter.Config[];
