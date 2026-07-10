import { defineConfig } from 'eslint/config';

import { bun, bunTypeChecked } from '../../configs/eslint/bun.config.js';
import { json } from '../../configs/eslint/json.config.js';
import type { FlatConfig } from '../../configs/eslint/typescript.config.js';

// Bun library: same as the node library but with the bun module resolver so builtins
// such as `bun:test` and `bun:sqlite` resolve instead of being flagged as unresolved.
export const bunLibrary: FlatConfig = defineConfig([...bun, ...json]);

// Same as `bunLibrary`, plus type-aware rules (needs a tsconfig; see `TypescriptOptions`).
export const bunLibraryTypeChecked: FlatConfig = defineConfig([...bunTypeChecked, ...json]);
