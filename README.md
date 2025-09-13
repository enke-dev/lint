# @enke.dev/lint

## Install packages

Make sure to install the necessary peer dependencies:

```bash
npm i -D @enke.dev/lint eslint prettier
```

For Typescript support, install:

```bash
npm i -D @enke.dev/lint eslint prettier jiti typescript typescript-eslint
```

## Prepare Eslint config

Create a `eslint.config.js` file in the root of your project and add the following content:

```js
import config from '@enke.dev/lint';

export default config;
```

### Using Typescript

If you intend to use Typescript for your config file, you just have to install `typescript` and `jiti`.

Your config file can then be renamed to `eslint.config.ts` and look like this at minimum:

```ts
import config from '@enke.dev/lint';

export default config;
```

You may want to modify the config to your needs, e.g. like this:

```ts
import config from '@enke.dev/lint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // extend the base config
  ...config,
  // ignore generated stuff
  { ignores: ['src/generated'] },
  // override rules for test files with mocha / chai
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': ['off'],
    },
  },
]);
```

### Using Monorepos

The VSCode Eslint plugin can be configured to pick up packages correctly by updating your `settings.json`, e.g.:

```json
{
  "eslint.workingDirectories": ["./packages/*"]
}
```

## Prepare Stylelint config (experimental)

Uses some common presets and can be used in CSS, SASS and SCSS files.\
It will enforce a specific property order and specific custom property prefixes if configured.

As this is totally opt-in, all necessary dependencies must be installed first:

```bash
npm i -D @enke.dev/lint stylelint stylelint-config-rational-order stylelint-config-standard-scss stylelint-order
```

Create a `stylelint.config.js` file in the root of your project and add the following content:

```js
// @ts-check

import { defineConfig } from '@enke.dev/lint/stylelint.config.js';

export default defineConfig({ cssCustomPropertyPrefix: 'your-prefix' });
```

For now, [no TypeScript support](https://github.com/stylelint/stylelint/issues/4940) is possible.
