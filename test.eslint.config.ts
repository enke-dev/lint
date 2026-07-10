import { defineConfig } from 'eslint/config';

import config from './eslint.config.js';

// used to lint this repo itself
// `test.run.bun.ts` imports `bun:test`, which only resolves under the bun runtime — exclude
// it from the node-run self-lint.
export default defineConfig([...config, { ignores: ['test/', 'test.run.bun.ts'] }]);
