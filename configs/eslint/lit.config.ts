import eslintPluginHtml from '@html-eslint/eslint-plugin';
import { defineConfig } from 'eslint/config';
import eslintPluginHtmlScripts from 'eslint-plugin-html';
import { configs as eslintPluginLitConfigs } from 'eslint-plugin-lit';
import { configs as eslintPluginLitA11yConfigs } from 'eslint-plugin-lit-a11y';
import { configs as eslintPluginWebComponentsConfigs } from 'eslint-plugin-wc';

import type { ConfigWithExtends, FlatConfig } from './typescript.config.js';
import { parserOptions } from './typescript.config.js';

// Lit / web-components support: element rules, a11y, and inline html-in-tagged-template linting.
const litConfig: ConfigWithExtends = {
  files: ['**/*.js', '**/*.ts'],
  extends: [
    eslintPluginWebComponentsConfigs['flat/recommended'],
    eslintPluginLitConfigs['flat/recommended'],
    eslintPluginLitA11yConfigs.recommended,
  ],
  plugins: {
    html: eslintPluginHtml,
    htmlScripts: eslintPluginHtmlScripts,
  },
  languageOptions: { parserOptions },
  settings: {
    litHtmlSources: true,
  },
  rules: {
    // inline html
    'html/require-img-alt': 'error',
    'html/no-multiple-h1': 'error',
    'html/no-extra-spacing-attrs': 'error',
    'html/no-duplicate-id': 'error',
    'html/require-li-container': 'error',
    'html/no-obsolete-tags': 'error',
    'html/require-closing-tags': 'error',
    'html/no-duplicate-attrs': 'error',

    // web components / a11y
    'wc/guard-super-call': 'off',
  },
};

export const lit: FlatConfig = defineConfig([litConfig]);
