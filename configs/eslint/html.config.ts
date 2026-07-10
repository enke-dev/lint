import eslintPluginHtml from '@html-eslint/eslint-plugin';
import eslintParserHtml from '@html-eslint/parser';
import { defineConfig } from 'eslint/config';
import eslintPluginHtmlScripts from 'eslint-plugin-html';

import type { ConfigWithExtends, FlatConfig } from './typescript.config.js';
import { parserOptions } from './typescript.config.js';

// Standalone HTML files.
const htmlConfig: ConfigWithExtends = {
  files: ['**/*.html'],
  plugins: {
    html: eslintPluginHtml,
    htmlScripts: eslintPluginHtmlScripts,
  },
  extends: ['html/recommended'],
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
};

export const html: FlatConfig = defineConfig([htmlConfig]);
