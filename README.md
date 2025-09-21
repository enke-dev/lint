# @enke.dev/lint

## Install packages

Make sure to install the necessary peer dependencies:

```bash
npm i -D @enke.dev/lint eslint prettier
```

For Typescript support, additionally install:

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

export default defineConfig([
  // extend the base config
  ...config,
  // configure typescript parser to your needs
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
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

## Development

This repo self-tests the configuration by linting itself: `npm run lint`.\
Therefore, a `text.config.ts` is used.

And additionally, a naive test is in place to check that the linter actually finds issues: `npm run test`.\
It uses the native Node test runner against some obviously faulty code in the `test` directory.
