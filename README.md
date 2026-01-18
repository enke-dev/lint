# @enke.dev/lint

Opinionated linting and formatting configurations for TypeScript web projects. Choose between two approaches:

1. **ESLint + Prettier + Stylelint** (modular, pluggable) - Traditional toolchain with extensive plugin ecosystem
2. **Biome** (all-in-one, fast) - Unified Rust-based alternative that's 10-20x faster

## Approach 1: ESLint + Prettier + Stylelint

### Install packages

Make sure to install the necessary peer dependencies:

```bash
npm i -D @enke.dev/lint eslint prettier @awmottaz/prettier-plugin-void-html typescript jiti typescript-eslint
```

### Prepare ESLint config

Create an `eslint.config.ts` file in the root of your project:

```ts
import config from '@enke.dev/lint';

export default config;
```

> [!NOTE]
> Using TypeScript requires specifying the root directory where to find the `tsconfig.json`.\
> A convenience function `setTsConfigRootDir` is provided to configure this option globally.

#### Extending the config

You can extend the base config to add custom rules or override defaults:

```ts
import config, { setTsConfigRootDir } from '@enke.dev/lint';

export default [
  // extend the base config
  ...config,
  // configure typescript parser to your needs
  setTsConfigRootDir(import.meta.dirname),
  // add custom rules (e.g., restrict imports)
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/internal/*'],
              message: 'Import from @/public/* instead',
            },
          ],
        },
      ],
    },
  },
];
```

> [!TIP]
> Extending configurations works the same way with all other configs provided by this package.

#### Using Monorepos

The VSCode ESLint plugin can be configured to pick up packages correctly by updating your `settings.json`:

```json
{
  "eslint.workingDirectories": ["./packages/*"]
}
```

### Prepare Prettier config

Create a `prettier.config.ts` file in the root of your project:

```ts
import config from '@enke.dev/lint/prettier.config.js';

export default config;
```

### Prepare Stylelint config (optional)

Uses common presets and can be used in CSS, SASS and SCSS files. Enforces specific property order and custom property prefixes.

Install the required dependencies:

```bash
npm i -D stylelint stylelint-config-rational-order stylelint-config-standard-scss stylelint-order
```

Create a `stylelint.config.ts` file in the root of your project:

```ts
import { defineConfig } from '@enke.dev/lint/stylelint.config.js';

export default defineConfig({ cssCustomPropertyPrefix: 'your-prefix' });
```

> [!NOTE]
> Stylelint might still have [bugs with TypeScript configs](https://github.com/stylelint/stylelint/issues/4940).

---

## Approach 2: Biome (Alternative)

Biome is a unified, Rust-based linter and formatter that's 10-20x faster than Node.js tools. It replaces ESLint + Prettier + Stylelint with a single tool.

### Install packages

```bash
npm i -D @biomejs/biome @enke.dev/lint
```

### Prepare Biome config

Create a `biome.json` file in the root of your project:

```json
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@enke.dev/lint/biome.json"]
}
```

#### Extending the config

You can override or add rules by extending the base configuration:

```json
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@enke.dev/lint/biome.json"],
  "linter": {
    "rules": {
      "nursery": {
        "noDuplicateCustomProperties": "error"
      }
    }
  }
}
```

For restricting imports (similar to ESLint example above), Biome uses a different approach:

```json
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "extends": ["@enke.dev/lint/biome.json"],
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "paths": {
              "@/internal": "Import from @/public/* instead"
            }
          }
        }
      }
    }
  }
}
```

### Limitations

Biome does not support all features from ESLint/Prettier/Stylelint. See [BIOME_COMPATIBILITY.md](./BIOME_COMPATIBILITY.md) for details.

---

## Development

This repo self-tests the configuration by linting itself: `npm run lint`

A naive test suite verifies that linters detect issues: `npm run test`\
It uses the native Node test runner with tests in `test/specs` against faulty code in the `test/fixtures` directory.
