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
        // { groups: [...eslintPluginSimpleImportSort.defaultGroups, ['\\.css\\?inline']] },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
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
    rules: {
      'no-irregular-whitespace': 'off',
    },
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
