import eslintPluginJson from '@eslint/json';
import { defineConfig } from 'eslint/config';

import type { ConfigWithExtends, FlatConfig } from './typescript.config.js';

// JSON files.
const jsonConfig: ConfigWithExtends = {
  files: ['**/*.json'],
  language: 'json/json',
  ignores: ['package-lock.json'],
  plugins: { json: eslintPluginJson },
  extends: [eslintPluginJson.configs.recommended],
  rules: {
    'json/top-level-interop': 'error',
  },
};

export const json: FlatConfig = defineConfig([jsonConfig]);
