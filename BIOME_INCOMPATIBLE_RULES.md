# Biome Configuration - Incompatible Rules

This document lists rules from the existing ESLint, Prettier, and Stylelint configurations that cannot be directly implemented in Biome or have limited support.

## ESLint Rules Not Available in Biome

### HTML Linting and Formatting

**Status (as of Biome v2.3.11):** Biome now supports HTML formatting and basic linting, but it's still more limited than `@html-eslint/eslint-plugin`.

**What Biome supports:**
- ✅ HTML formatting (including embedded JS/CSS in `<script>` and `<style>` tags)
- ✅ Basic HTML linting
- ✅ Experimental support for Vue, Svelte, and Astro files

**What's not available or limited:**
The following HTML-specific ESLint rules are not available in Biome:

- `html/require-img-alt` - HTML image alt text requirement
- `html/no-multiple-h1` - Multiple H1 tag restriction
- `html/no-extra-spacing-attrs` - Extra spacing in attributes
- `html/no-duplicate-id` - Duplicate ID detection
- `html/require-li-container` - List item container requirement
- `html/no-obsolete-tags` - Obsolete tag detection
- `html/require-closing-tags` - Closing tag requirement
- `html/no-duplicate-attrs` - Duplicate attribute detection
- `html/indent` - HTML indentation
- `html/lowercase` - HTML lowercase enforcement
- `html/no-accesskey-attrs` - Accesskey attribute restriction
- `html/no-aria-hidden-body` - ARIA hidden on body restriction
- `html/no-duplicate-class` - Duplicate class detection
- `html/no-duplicate-in-head` - Duplicate head element detection
- `html/no-empty-headings` - Empty heading detection
- `html/no-invalid-entities` - Invalid entity detection
- `html/no-heading-inside-button` - Heading inside button restriction
- `html/no-invalid-entity` - Invalid entity detection
- `html/no-invalid-role` - Invalid ARIA role detection
- `html/no-nested-interactive` - Nested interactive element restriction
- `html/no-multiple-empty-lines` - Multiple empty lines restriction
- `html/no-target-blank` - Target blank security (partially covered by `noBlankTarget`)
- `html/no-trailing-spaces` - Trailing spaces
- `html/report-bad-indent` - Bad indentation reporting
- `html/require-input-label` - Input label requirement

**Recommendation**: 
- **For HTML formatting:** Biome can now be used for HTML files and provides fast, Prettier-compatible formatting.
- **For comprehensive HTML linting:** Continue using ESLint with `@html-eslint/eslint-plugin` for advanced HTML-specific rules.
- **For framework files (Vue/Svelte/Astro):** Biome's support is experimental but functional for basic formatting and linting.

For more details, see [Biome's Language Support documentation](https://biomejs.dev/internals/language-support/).

### Import/Export Rules
The following import-related rules from `eslint-plugin-import` have limited or no support:

- `import/enforce-node-protocol-usage` - Node protocol prefix enforcement
- `import/consistent-type-specifier-style` - Type import style (Biome has `noUnusedImports` but different behavior)
- `import/no-unresolved` - Unresolved import detection (requires resolver configuration)
- `import/extensions` - File extension requirements
- `import-extensions/require-extensions` - Extension requirement
- `import-extensions/require-index` - Index file requirement

**Recommendation**: Biome provides automatic import organization but doesn't have the same granular control over import styles and resolution. For TypeScript projects, the TypeScript compiler can catch unresolved imports.

### Simple Import Sort
- `simple-import-sort/imports` with custom groups - Biome organizes imports automatically but doesn't support custom grouping rules
- `simple-import-sort/exports` - Export sorting

**Recommendation**: Biome's automatic import organization is enabled and works well for most cases but doesn't support the exact custom grouping specified in the ESLint config.

### Web Components and Lit-specific Rules
The following rules from `eslint-plugin-wc`, `eslint-plugin-lit`, and `eslint-plugin-lit-a11y` are not available:

- `wc/guard-super-call` - Web component super call guarding
- All Lit-specific linting rules for template syntax
- Lit accessibility rules for template HTML

**Recommendation**: For Web Components and Lit projects, continue using ESLint with these specialized plugins, or use Biome only for non-Lit TypeScript files.

### TypeScript-specific Rules
Some TypeScript-ESLint rules have different behavior or are not available:

- `@typescript-eslint/no-unused-expressions` with specific options
- TypeScript strict type-checking rules that require project references

**Recommendation**: Most TypeScript rules are covered, but for projects requiring strict TypeScript type-checking rules, ESLint with `typescript-eslint` may be more comprehensive.

### Prettier Integration
- `prettier/prettier` - This rule integrates Prettier with ESLint. In Biome, formatting is built-in and doesn't require a separate rule.

**Recommendation**: Biome's formatter is ~97% compatible with Prettier and is configured in this package to match the existing Prettier config.

## Stylelint Rules Not Available in Biome

Biome has **limited CSS linting support** compared to Stylelint. The following Stylelint features are not fully available:

### CSS Property Ordering
- `stylelint-config-rational-order` - Rational property order enforcement
- `plugin/rational-order` - Property grouping and ordering

### SCSS Support
- `stylelint-config-standard-scss` - SCSS-specific rules
- SCSS syntax validation

### Custom Property Patterns
- `custom-property-pattern` - Custom CSS property naming pattern enforcement (e.g., `--prefix-property-name`)

### Other Stylelint Rules
- `declaration-empty-line-before` - Empty line before declarations
- `rule-empty-line-before` - Empty line before rules

**Recommendation**: For CSS/SCSS projects requiring strict property ordering, custom property patterns, or SCSS-specific linting, **continue using Stylelint**. Biome can be used for JavaScript/TypeScript/JSON files in the same project, while Stylelint handles CSS/SCSS.

## Summary

### Full Support
- ✅ **JavaScript/TypeScript linting** - Most ESLint rules are covered
- ✅ **JSON linting and formatting** - Full support
- ✅ **Code formatting** - Prettier-compatible formatting
- ✅ **Accessibility rules** - Most a11y rules are supported
- ✅ **Basic import organization** - Automatic import sorting

### Partial Support
- ⚠️ **Import rules** - Basic support, but not all custom import rules are available
- ⚠️ **CSS formatting** - Basic CSS formatting works, but limited linting
- ⚠️ **TypeScript strict rules** - Most rules covered, some advanced type-checking rules may differ

### No Support / Recommended to Continue Using Original Tools
- ❌ **HTML linting** - Use `@html-eslint/eslint-plugin` with ESLint
- ❌ **Web Components/Lit** - Use `eslint-plugin-wc` and `eslint-plugin-lit` with ESLint
- ❌ **CSS property ordering** - Use Stylelint
- ❌ **SCSS linting** - Use Stylelint
- ❌ **CSS custom property patterns** - Use Stylelint

## Recommended Usage

Biome is best suited as a **drop-in replacement** for ESLint + Prettier in projects focused on **JavaScript and TypeScript** with **JSON** files.

For projects with:
- **HTML files** → Continue using ESLint with HTML plugins
- **Web Components/Lit** → Continue using ESLint with specialized plugins
- **CSS/SCSS with property ordering** → Continue using Stylelint

Biome can be used **alongside** these tools in a mixed approach:
- Use Biome for `.js`, `.ts`, `.jsx`, `.tsx`, and `.json` files
- Use ESLint for `.html` files and Web Components
- Use Stylelint for `.css` and `.scss` files
