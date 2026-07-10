import { existsSync, readFileSync } from 'node:fs';
import { cwd } from 'node:process';

import { defineConfig, globalIgnores } from 'eslint/config';

import { bun, bunTypeChecked } from './configs/eslint/bun.config.js';
import { html } from './configs/eslint/html.config.js';
import { json } from './configs/eslint/json.config.js';
import { lit } from './configs/eslint/lit.config.js';
import { node, nodeTypeChecked } from './configs/eslint/node.config.js';
import type { FlatConfig } from './configs/eslint/typescript.config.js';
import { setTsConfigRootDir } from './configs/eslint/typescript.config.js';

// re-export the individual chunks so consumers can compose their own config
export { bun, bunTypeChecked, html, json, lit, node, nodeTypeChecked, setTsConfigRootDir };

// collect gitignore excludes
let gitIgnoreLines: string[] = [];
const pathToGitIgnore = `${cwd()}/.gitignore`;
if (existsSync(pathToGitIgnore)) {
  const gitIgnores = readFileSync(pathToGitIgnore, 'utf-8');
  gitIgnoreLines = gitIgnores
    .split('\n')
    .map(line => line.trim().replace(/^\//, ''))
    .filter(line => Boolean(line) && !line.startsWith('#'));
}

/**
 * Legacy all-in-one configuration, kept for backwards compatibility.
 *
 * Bundles the `node`, `lit`, `html` and `json` chunks and additionally wires up
 * gitignore-based ignores plus this package's own tsconfig root — assumptions that do not
 * hold for every consumer.
 *
 * Prefer a ready-made preset (`@enke.dev/lint/eslint/presets/*`) or compose the individual
 * single configs (`@enke.dev/lint/eslint/*`) instead.
 *
 * @deprecated Use a preset (`frontend`, `nodeLibrary`, `bunLibrary`) or compose the single
 * configs (`node`, `bun`, `lit`, `html`, `json`).
 */
const config: FlatConfig = defineConfig([
  globalIgnores([...gitIgnoreLines, 'dist/']),
  setTsConfigRootDir(import.meta.dirname),
  ...node,
  ...lit,
  ...html,
  ...json,
]);

export default config;
