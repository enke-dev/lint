import { defineConfig } from 'eslint/config';

import { json } from '../../configs/eslint/json.config.js';
import { node, nodeTypeChecked } from '../../configs/eslint/node.config.js';
import type { FlatConfig } from '../../configs/eslint/typescript.config.js';

// Node library: TypeScript/JavaScript emitted via tsc plus JSON. No web components or
// standalone HTML.
export const nodeLibrary: FlatConfig = defineConfig([...node, ...json]);

// Same as `nodeLibrary`, plus type-aware rules (needs a tsconfig; see `TypescriptOptions`).
export const nodeLibraryTypeChecked: FlatConfig = defineConfig([...nodeTypeChecked, ...json]);
