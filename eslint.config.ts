import { existsSync, readFileSync } from 'node:fs';
import { cwd } from 'node:process';

import { defineConfig, globalIgnores } from 'eslint/config';

import { bun } from './configs/eslint/bun.config.js';
import { html } from './configs/eslint/html.config.js';
import { json } from './configs/eslint/json.config.js';
import { lit } from './configs/eslint/lit.config.js';
import { node } from './configs/eslint/node.config.js';
import type { FlatConfig } from './configs/eslint/typescript.config.js';
import { setTsConfigRootDir } from './configs/eslint/typescript.config.js';

// re-export the individual chunks so consumers can compose their own config
export { bun, html, json, lit, node, setTsConfigRootDir };

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

// Default: the previous combined config, node-flavoured (no bun resolver flag).
const config: FlatConfig = defineConfig([
  globalIgnores([...gitIgnoreLines, 'dist/']),
  setTsConfigRootDir(import.meta.dirname),
  ...node,
  ...lit,
  ...html,
  ...json,
]);

export default config;
