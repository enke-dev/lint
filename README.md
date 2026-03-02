# @enke.dev/lint

A very opinionated linting and formatting configuration for JavaScript and TypeScript projects.

This package provides configurations for:
- **ESLint** - for comprehensive linting (recommended)
- **Oxlint** - for fast linting as an alternative to ESLint
- **Prettier** - for code formatting (works with both ESLint and Oxlint)
- **Stylelint** (experimental) - for CSS, SASS and SCSS files

## Quick Start

Choose between **ESLint** or **Oxlint** for your linting needs. Both work with Prettier for formatting.

### Option 1: ESLint (Recommended)

ESLint provides comprehensive linting with more rules and plugin support.

**Install packages:**

```bash
npm i -D @enke.dev/lint eslint prettier @awmottaz/prettier-plugin-void-html
```

For Typescript support, additionally install:

```bash
npm i -D jiti typescript typescript-eslint
```

**Create ESLint config:**

Create a `eslint.config.js` (or `eslint.config.ts`) file in the root of your project:

```js
import config from '@enke.dev/lint';

export default config;
```

### Option 2: Oxlint (Fast Alternative)

Oxlint is a fast Rust-based linter that covers essential rules with better performance.

**Install packages:**

```bash
npm i -D @enke.dev/lint oxlint prettier @awmottaz/prettier-plugin-void-html
```

**Create Oxlint config:**

Create a `oxlint.config.ts` file in the root of your project:

```ts
import config from '@enke.dev/lint/oxlint.config.js';

export default config;
```

**Note:** Oxlint focuses on correctness and best practices. You should still use Prettier for code formatting.

## Extending Configurations

### Extending ESLint config

> [!NOTE]
> Using Typescript may requires the root directory where to find the `tsconfig.json` to be specified.\
> Therefore, a convenience function `setTsConfigRootDir` is provided to configure this option globally.

For example for setting up the Typescript parser, you can extend the base config like this:

```ts
import config, { setTsConfigRootDir } from '@enke.dev/lint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // extend the base config
  ...config,
  // configure typescript parser to your needs
  setTsConfigRootDir(import.meta.dirname),
]);
```

### Extending Oxlint config

You can extend the base Oxlint config by importing it and adding your own rules:

```ts
import { defineConfig } from 'oxlint';
import baseConfig from '@enke.dev/lint/oxlint.config.js';

export default defineConfig({
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // Add your custom rules here
    'no-console': 'off', // example: allow console
  },
});
```

> [!TIP]
> Extending configurations works the same way with all other configs provided by this package.

### Using Monorepos

The VSCode ESLint plugin can be configured to pick up packages correctly by updating your `settings.json`, e.g.:

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

This repo self-tests the configurations by linting itself:
- ESLint: `npm run lint`
- Oxlint: `npm run lint:oxlint`

For testing, `test.eslint.config.ts` and `test.oxlint.config.ts` are used.

Additionally, naive tests are in place to check that the linters actually find issues: `npm run test`.\
The tests use the native Node test runner against some obviously faulty code in the `test` directory.

### Updating dependencies

If not already done via [dependabot](https://dependabot.com/), dependencies can be updated by running `npx --yes npm-check-updates --dep dev,optional,peer,prod,packageManager --upgrade --reject @types/node`.
