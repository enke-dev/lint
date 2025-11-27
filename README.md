# @enke.dev/lint

## Install packages

Make sure to install the necessary peer dependencies:

```bash
npm i -D @enke.dev/lint eslint prettier @awmottaz/prettier-plugin-void-html
```

For Typescript support, additionally install:

```bash
npm i -D jiti typescript typescript-eslint
```

## Prepare Eslint config

Create a `eslint.config.js` (or `eslint.config.ts`) file in the root of your project and add the following content:

```js
import config from '@enke.dev/lint';

export default config;
```

### Extending a config

For example for setting up the Typescript parser, you can extend the base config like this:

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

> [!TIP]
> This applies to all configs exported by this package, e.g. for Prettier as well.

### Using Monorepos

The VSCode Eslint plugin can be configured to pick up packages correctly by updating your `settings.json`, e.g.:

```json
{
  "eslint.workingDirectories": ["./packages/*"]
}
```

## Prepare Prettier config

A [shared prettier configuration](https://prettier.io/docs/sharing-configurations) can be used by creating a `prettier.config.js` (or `prettier.config.ts`) file in the root of your project with the following content:

```js
import config from '@enke.dev/lint/prettier.config.js';

export default config;
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
