/// <reference types="./eslint-plugins.d.ts" />

import { fixupPluginRules } from '@eslint/compat';
import eslintJs from '@eslint/js';
import eslintJson from '@eslint/json';
import { defineConfig } from 'eslint/config';
import eslintPluginHtml from 'eslint-plugin-html';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginImportExtension from 'eslint-plugin-import-extensions';
import { configs as eslintPluginLitConfigs } from 'eslint-plugin-lit';
import { configs as eslintPluginLitA11yConfigs } from 'eslint-plugin-lit-a11y';
import { configs as eslintPluginPackageJsonConfigs } from 'eslint-plugin-package-json';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import { configs as eslintPluginWebComponentsConfigs } from 'eslint-plugin-wc';
import eslintTs from 'typescript-eslint';

export default defineConfig([
  eslintJs.configs.recommended,
  ...eslintTs.configs.strict,
  ...eslintTs.configs.stylistic,
  eslintPluginPrettierRecommended,
  eslintPluginImport.flatConfigs.recommended,

  {
    ignores: ['node_modules/', 'dist/'],
  },

  // Javascript and Typescript files
  {
    files: ['**/*.{js,ts}'],
    ...eslintPluginWebComponentsConfigs['flat/recommended'],
    ...eslintPluginLitConfigs['flat/recommended'],
    ...eslintPluginLitA11yConfigs.recommended,
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
      'import-extensions': fixupPluginRules(eslintPluginImportExtension),
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: true,
        requireConfigFile: false,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      litHtmlSources: true,
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

      // web components / a11y
      'wc/guard-super-call': 'off',
    },
  },

  // HTML files
  {
    files: ['**/*.html'],
    plugins: { html: eslintPluginHtml },
  },

  // JSON files
  {
    ...eslintPluginPackageJsonConfigs.recommended,
    ...eslintJson.configs.recommended,
    ignores: ['package-lock.json'],
    language: 'json/json',
    rules: {
      'no-irregular-whitespace': 'off',
      'import-extensions/require-extensions': 'off',
      'import-extensions/require-index': 'off',
    },
    settings: {
      'html/html-extensions': ['.html'],
    },
  },
]);
