# @enke.dev/lint

## Install packages

Make sure to install the necessary peer dependencies `eslint`, `prettier` and `typescript`.

```bash
npm i -D @enke.dev/lint eslint prettier typescript
```

## Prepare config

Create a `eslint.config.js` file in the root of your project and add the following content:

```js
import config from '@enke.dev/lint';

export default config;
```

## Using Typescript

If you intend to use Typescript for your config file, you just have to install `typescript`.

Your config file can then renamed to `eslint.config.ts` and look like this at minimum:

```ts
import config from '@enke.dev/lint';
export default config;
```

But you may want to modify the config to your needs:

```ts
import config from '@enke.dev/lint';
import type { Linter } from 'eslint';

export default [
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
] satisfies Linter.Config[];
```

> Until eslint 9.18.0 some hacks have been necessary to make this work.
> If your stuck to an older version, you can use a [release prior 0.3.0](https://www.npmjs.com/package/@enke/lint/v/0.2.2).

## Using monorepos

Like the experimental typescript config flag above, the VSCode Eslint plugin can be configured to pick up the packages correctly by setting:

```json
{
  "eslint.workingDirectories": ["./packages/foo", "./packages/bar"]
}
```

## Stylelint (experimental)

Using a shared Stylelint config with two major presets, `stylelint-config-standard-scss` and `stylelint-config-rational-order`.

As this is totally opt-in, all required dependencies must be installed:

```bash
npm i -D stylelint stylelint-config-rational-order stylelint-config-standard-scss stylelint-order
```

Create a `stylelint.config.js` file in the root of your project and add the following content:

```js
// @ts-check

import { defineConfig } from '@enke.dev/lint/stylelint.config.js';

export default defineConfig({ cssCustomPropertyPrefix: 'your-prefix' });
```

For now, no TypeScript support is included.
