import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import type { FlatConfig } from './typescript.config.js';
import { typescript } from './typescript.config.js';

// Same base as `node`, but with the bun module resolver so builtins such as
// `bun:test` and `bun:sqlite` resolve instead of being flagged as unresolved.
export const bun: FlatConfig = defineConfig([eslintPluginPrettierRecommended, typescript('bun')]);

// Same as `bun`, plus type-aware rules (needs a tsconfig; see `TypescriptOptions`).
export const bunTypeChecked: FlatConfig = defineConfig([
  eslintPluginPrettierRecommended,
  typescript('bun', { typeChecked: true }),
]);
