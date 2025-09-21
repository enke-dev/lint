/// <reference types="./eslint-plugins.d.ts" />

import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import eslintPluginJs from '@eslint/js';
import eslintPluginJson from '@eslint/json';
import eslintPluginHtml from '@html-eslint/eslint-plugin';
import eslintParserHtml from '@html-eslint/parser';
import type { Linter } from 'eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginHtmlScripts from 'eslint-plugin-html';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginImportExtension from 'eslint-plugin-import-extensions';
import { configs as eslintPluginLitConfigs } from 'eslint-plugin-lit';
import { configs as eslintPluginLitA11yConfigs } from 'eslint-plugin-lit-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import { configs as eslintPluginWebComponentsConfigs } from 'eslint-plugin-wc';
import eslintTs from 'typescript-eslint';

// collect gitignore excludes
let gitIgnoreLines: string[] = [];
try {
  const gitIgnores = await readFile(pathToFileURL(`${cwd()}/.gitignore`).href, 'utf-8');
  gitIgnoreLines = gitIgnores
    .split('\n')
    .map(line => line.trim().replace(/^\//, ''))
    .filter(line => line && !line.startsWith('#'));
} catch (error) {
  // noop - maybe a warning?
}

// shared parser options
const parserOptions: Linter.ParserOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};

export default defineConfig([
  globalIgnores([...gitIgnoreLines, 'dist/']),

  eslintPluginPrettierRecommended,

  // Javascript and Typescript files
  {
    files: ['**/*.js', '**/*.ts'],
    extends: [
      eslintPluginJs.configs.recommended,
      ...eslintTs.configs.strict,
      ...eslintTs.configs.stylistic,
      eslintPluginWebComponentsConfigs['flat/recommended'],
      eslintPluginLitConfigs['flat/recommended'],
      eslintPluginLitA11yConfigs.recommended,
      eslintPluginImport.flatConfigs.recommended,
    ],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
      'import-extensions': fixupPluginRules(eslintPluginImportExtension),
      html: eslintPluginHtml,
      htmlScripts: eslintPluginHtmlScripts,
    },
    languageOptions: { parserOptions },
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
      'no-console': 'error',

      // inline html
      'html/require-img-alt': 'error',
      'html/no-multiple-h1': 'error',
      'html/no-extra-spacing-attrs': 'error',
      'html/no-duplicate-id': 'error',
      'html/require-li-container': 'error',
      'html/no-obsolete-tags': 'error',
      'html/require-closing-tags': 'error',
      'html/no-duplicate-attrs': 'error',

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
    plugins: {
      html: eslintPluginHtml,
      htmlScripts: eslintPluginHtmlScripts,
    },
    extends: [eslintPluginHtml.configs['flat/recommended']],
    language: 'html/html',
    languageOptions: {
      parser: eslintParserHtml,
      parserOptions,
    },
    settings: {
      'html/indent': '+2',
      'html/lowercase': 'error',
      'html/no-accesskey-attrs': 'error',
      'html/no-aria-hidden-body': 'error',
      'html/no-aria-hidden-on-focusable': 'error',
      'html/no-duplicate-class': 'error',
      'html/no-duplicate-in-head': 'error',
      'html/no-empty-headings': 'error',
      'html/no-invalid-entities': 'error',
      'html/no-heading-inside-button': 'error',
      'html/no-invalid-entity': 'error',
      'html/no-invalid-role': 'error',
      'html/no-nested-interactive': 'error',
      'html/no-multiple-empty-lines': 'error',
      'html/no-target-blank': 'error',
      'html/no-trailing-spaces': 'error',
      'html/report-bad-indent': 'error',
      'html/require-input-label': 'error',
    },
    rules: {
      'html/indent': ['error', 2],
    },
  },

  // JSON files
  {
    files: ['**/*.json'],
    language: 'json/json',
    ignores: ['package-lock.json'],
    plugins: { json: eslintPluginJson },
    extends: [eslintPluginJson.configs.recommended],
    rules: {
      'json/top-level-interop': 'error',
    },
  },
]);
