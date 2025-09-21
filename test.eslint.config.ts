import { defineConfig } from 'eslint/config';

import config from './eslint.config.js';

// used to lint this repo itself
export default defineConfig([...config, { ignores: ['test/'] }]);
