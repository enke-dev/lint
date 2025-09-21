import type { Config } from 'stylelint';

import { defineConfig } from './stylelint.config.js';

export default defineConfig({ cssCustomPropertyPrefix: 'your-prefix' }) as Config;
