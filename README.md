# @enke.dev/lint

A very opinionated Eslint and Prettier configuration for JavaScript and TypeScript projects.\
It also includes an experimental Stylelint configuration for CSS, SASS and SCSS files.

In the near future this might hold a configuration for [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) as well.

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

Create a `eslint.config.js` (or `eslint.config.ts`) file in the root of your project. There are three ways to consume the configuration, from least to most control: the legacy all-in-one config, a ready-made preset, or the individual single configs.

> [!NOTE]
> Using Typescript may require the root directory where to find the `tsconfig.json` to be specified.\
> Therefore, a convenience function `setTsConfigRootDir` is provided to configure this option globally.

### 1. Legacy config

> [!WARNING]
> The default export is **deprecated**. It bundles `node` + `lit` + `html` + `json` and additionally assumes gitignore-based ignores and this package's own tsconfig root — assumptions that do not hold for every project. Prefer a [preset](#2-presets) or [single configs](#3-single-configs).

```js
import config from '@enke.dev/lint';

export default config;
```

### 2. Presets

Ready-made combinations for common project types. Import the one that matches your project and export it directly:

```ts
import { frontend } from '@enke.dev/lint/eslint/presets/frontend';

export default frontend;
```

Available presets:

| Preset                                       | Import name   | Bundles                          |
| -------------------------------------------- | ------------- | -------------------------------- |
| `@enke.dev/lint/eslint/presets/frontend`     | `frontend`    | `node` + `lit` + `html` + `json` |
| `@enke.dev/lint/eslint/presets/node-library` | `nodeLibrary` | `node` + `json`                  |
| `@enke.dev/lint/eslint/presets/bun-library`  | `bunLibrary`  | `bun` + `json`                   |

Presets are flat config arrays, so they can be extended — e.g. to point the TypeScript parser at your `tsconfig.json`:

```ts
import { defineConfig } from 'eslint/config';

import { setTsConfigRootDir } from '@enke.dev/lint';
import { frontend } from '@enke.dev/lint/eslint/presets/frontend';

export default defineConfig([...frontend, setTsConfigRootDir(import.meta.dirname)]);
```

### 3. Single configs

For full control, compose the individual chunks yourself. Each is a flat config array; spread the ones you need:

```ts
import { defineConfig } from 'eslint/config';

import { bun } from '@enke.dev/lint/eslint/bun';
import { html } from '@enke.dev/lint/eslint/html';
import { json } from '@enke.dev/lint/eslint/json';
import { lit } from '@enke.dev/lint/eslint/lit';

export default defineConfig([
  ...bun, // TypeScript + import rules, bun module resolver
  ...lit, // web components, lit and inline-html linting
  ...html, // standalone .html files
  ...json, // .json files
]);
```

Available configs:

| Import                       | Name   | Applies to        | Notes                                                           |
| ---------------------------- | ------ | ----------------- | --------------------------------------------------------------- |
| `@enke.dev/lint/eslint/node` | `node` | `**/*.js`, `*.ts` | Base TS/import rules, node resolver.                            |
| `@enke.dev/lint/eslint/bun`  | `bun`  | `**/*.js`, `*.ts` | Same base, bun resolver (resolves `bun:test`, `bun:sqlite`, …). |
| `@enke.dev/lint/eslint/lit`  | `lit`  | `**/*.js`, `*.ts` | Web components, lit, a11y and inline-html rules.                |
| `@enke.dev/lint/eslint/html` | `html` | `**/*.html`       | Standalone HTML files.                                          |
| `@enke.dev/lint/eslint/json` | `json` | `**/*.json`       | JSON files.                                                     |

> [!NOTE]
> `node` and `bun` differ only by the import resolver — pick one.

### Type-aware linting

By default the rules are syntactic only (typescript-eslint `strict` + `stylistic`), so no `tsconfig` is required. Every TypeScript base — the `node` / `bun` single configs and all three presets — additionally ships a **type-checked** variant that enables the type-aware rule sets (`strictTypeChecked` + `stylisticTypeChecked`, e.g. `no-floating-promises`, `no-misused-promises`, `await-thenable`).

Each variant is an extra export from the same module — just add the `TypeChecked` suffix:

| Base          | Type-checked variant     | Import from                                  |
| ------------- | ------------------------ | -------------------------------------------- |
| `node`        | `nodeTypeChecked`        | `@enke.dev/lint/eslint/node`                 |
| `bun`         | `bunTypeChecked`         | `@enke.dev/lint/eslint/bun`                  |
| `frontend`    | `frontendTypeChecked`    | `@enke.dev/lint/eslint/presets/frontend`     |
| `nodeLibrary` | `nodeLibraryTypeChecked` | `@enke.dev/lint/eslint/presets/node-library` |
| `bunLibrary`  | `bunLibraryTypeChecked`  | `@enke.dev/lint/eslint/presets/bun-library`  |

```ts
import { frontendTypeChecked } from '@enke.dev/lint/eslint/presets/frontend';

export default frontendTypeChecked;
```

> [!WARNING]
> Type-aware rules require a TypeScript program. The variants enable `projectService`, which auto-discovers the nearest `tsconfig.json` — but any file **not** covered by one (stray configs, generated JS) will error unless you configure [`parserOptions.projectService.allowDefaultProject`](https://typescript-eslint.io/packages/parser/#projectservice). Type-aware linting is also noticeably slower.

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

Prerequisites:

- **Node** — version pinned in [`.node-version`](.node-version) (use `nvm`/`fnm` to match it).
- **[bun](https://bun.sh/)** — required for the `test:bun` suite; install it globally (`curl -fsSL https://bun.sh/install | bash`).

This repo self-tests the configuration by linting itself: `npm run lint`.\
Therefore, a `test.eslint.config.ts` is used.

And additionally, naive tests are in place to check that the linter actually finds issues: `npm run test`.\
This runs two suites:

- `npm run test:node` — the native Node test runner against obviously faulty code in the `test` directory (default/legacy config, prettier, stylelint).
- `npm run test:bun` — the bun test runner (`test.run.bun.ts`), which exercises the `bun` and type-checked configs against the source directly (bun resolves `.js`→`.ts`, so no build is needed). Requires [bun](https://bun.sh/).

### Updating dependencies

If not already done via [dependabot](https://dependabot.com/), dependencies can be updated by running `npx --yes npm-check-updates --dep dev,optional,peer,prod,packageManager --upgrade --reject @types/node`.
