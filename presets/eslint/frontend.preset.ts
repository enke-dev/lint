import { defineConfig } from 'eslint/config';

import { html } from '../../configs/eslint/html.config.js';
import { json } from '../../configs/eslint/json.config.js';
import { lit } from '../../configs/eslint/lit.config.js';
import { node, nodeTypeChecked } from '../../configs/eslint/node.config.js';
import type { FlatConfig } from '../../configs/eslint/typescript.config.js';

// Frontend projects: TypeScript/JavaScript with web components (lit), inline and
// standalone HTML, and JSON. Bundled/emitted via tsc, so node-style `.js` import
// extensions and the node resolver.
export const frontend: FlatConfig = defineConfig([...node, ...lit, ...html, ...json]);

// Same as `frontend`, plus type-aware rules (needs a tsconfig; see `TypescriptOptions`).
export const frontendTypeChecked: FlatConfig = defineConfig([
  ...nodeTypeChecked,
  ...lit,
  ...html,
  ...json,
]);
