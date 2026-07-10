import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import type { FlatConfig } from './typescript.config.js';
import { typescript } from './typescript.config.js';

// TypeScript / JavaScript for projects that emit via tsc and run on node.
export const node: FlatConfig = defineConfig([eslintPluginPrettierRecommended, typescript('node')]);
