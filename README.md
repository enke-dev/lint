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

> [!NOTE]
> Using Typescript may requires the root directory where to find the `tsconfig.json` to be specified.\
> Therefore, a convenience function `setTsConfigRootDir` is provided to configure this option globally.

### Extending a config

For example for setting up the Typescript parser, you can extend the base config like this:

```ts
import config, { setTsConfigRootDir } from '@enke.dev/lint';

export default defineConfig([
  // extend the base config
  ...config,
  // configure typescript parser to your needs
  setTsConfigRootDir(import.meta.dirname),
]);
```

> [!TIP]
> Extending configurations works the same way with all other configs provided by this package.

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

## Prepare Biome config (alternative to ESLint/Prettier/Stylelint)

[Biome](https://biomejs.dev/) is a fast, all-in-one linter and formatter that can **replace** ESLint, Prettier, and Stylelint.\
This package provides a Biome configuration that mirrors the ESLint, Prettier, and Stylelint rules **where possible**.

> [!IMPORTANT]
> **Choose Either Biome OR ESLint+Prettier+Stylelint - Not Both**
> 
> Biome is designed as a complete replacement, not a supplement. Mixing both tools creates unnecessary complexity.
> 
> **Use Biome if:** Your project is pure JS/TS/JSON without HTML files, Web Components, or advanced CSS linting needs.
> 
> **Stick with ESLint+Prettier+Stylelint if:** Your project uses HTML files, Web Components/Lit, or requires CSS property ordering/SCSS linting.
> 
> **Note (2026):** Biome 2.0 introduced GritQL-based custom plugins, but the specialized features (HTML linting, Lit/Web Components) still cannot be easily replicated. See [BIOME_INCOMPATIBLE_RULES.md](./BIOME_INCOMPATIBLE_RULES.md) for details.

First, install the necessary dependencies:

```bash
npm i -D @enke.dev/lint @biomejs/biome
```

### Configuration

Create a `biome.config.ts` file in your project root and generate the configuration:

```ts
import { defineConfig } from '@enke.dev/lint/biome.config.js';
import { writeFileSync } from 'node:fs';

const config = defineConfig({ root: true });
writeFileSync('biome.config.json', JSON.stringify(config, null, 2));
```

Then run the file to generate `biome.config.json`:

```bash
npx tsx biome.config.ts
```

### Using Biome

Once configured, you can use Biome to check and format your code:

```bash
# Check all files
npx biome check .

# Check and apply fixes
npx biome check --write .

# Format only
npx biome format --write .
```

### VSCode Integration

Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for VSCode and add to your `settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true
}
```

## Development

This repo self-tests the configuration by linting itself: `npm run lint`.\
Therefore, a `test.eslint.config.ts` is used.

And additionally, a naive test is in place to check that the linter actually finds issues: `npm run test`.\
It uses the native Node test runner against some obviously faulty code in the `test` directory.
