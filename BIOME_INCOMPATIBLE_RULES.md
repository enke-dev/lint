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

### When to Use Biome as a Complete Replacement

Biome is best suited as a **complete replacement** for ESLint + Prettier + Stylelint when:

- ✅ **Pure JS/TS/JSON projects** - No HTML files, no Web Components/Lit
- ✅ **Standard frameworks** - React, Next.js, Node.js with mainstream patterns
- ✅ **Performance critical** - Large codebases where 10x+ faster linting/formatting matters
- ✅ **Simplified tooling** - Want single tool, single config instead of coordinating ESLint/Prettier/Stylelint

**What you get:**
- Full JavaScript/TypeScript linting (ESLint-compatible rules)
- Full formatting support (97%+ Prettier-compatible)
- JSON linting and formatting
- Most accessibility rules
- Automatic import organization
- Much faster performance (8-13x)
- Zero config conflicts

### When Biome Cannot Fully Replace ESLint/Prettier/Stylelint

**This package's ESLint config includes specialized features that Biome does not support:**

#### Critical Gaps for This Package's Users:
- ❌ **HTML-specific linting** - `@html-eslint/eslint-plugin` rules (img alt text, duplicate IDs, ARIA, etc.)
- ❌ **Web Components/Lit template linting** - `eslint-plugin-lit`, `eslint-plugin-lit-a11y`, `eslint-plugin-wc`
- ❌ **Custom import sort groups** - `eslint-plugin-simple-import-sort` with specific grouping
- ❌ **CSS property ordering** - `stylelint-config-rational-order`
- ❌ **SCSS linting** - Full SCSS validation and rules
- ❌ **Custom CSS property patterns** - Enforcing naming conventions like `--prefix-name`

**Trade-off Assessment:**

If your project uses **any** of the above features (HTML files, Web Components, Lit, or strict CSS/SCSS linting), choosing Biome means:
- **You lose those specialized checks** - No equivalent in Biome
- **You'd need to supplement with ESLint/Stylelint anyway** - defeating the "single tool" benefit
- **Better to stick with ESLint + Prettier + Stylelint** for full feature coverage

### Recommended Decision Matrix

| Your Project Uses | Recommended Choice | Why |
|-------------------|-------------------|-----|
| Just JS/TS/JSON | **Biome only** | Full replacement, much faster |
| JS/TS + React (no HTML files) | **Biome only** | Full replacement, much faster |
| HTML files for linting | **ESLint + Prettier** | Biome lacks HTML linting rules |
| Web Components/Lit | **ESLint + Prettier** | Biome lacks template linting |
| CSS/SCSS with strict rules | **ESLint + Prettier + Stylelint** | Biome lacks CSS property ordering |
| Mixed (HTML + Lit + CSS) | **ESLint + Prettier + Stylelint** | Keep existing setup |

### Hybrid Approach (Not Recommended)

While technically possible to use Biome for `.js`/`.ts` files and ESLint for `.html` files, this creates:
- ❌ Configuration complexity (two separate configs)
- ❌ Tool coordination overhead
- ❌ Team confusion about which tool to use when
- ❌ Loses Biome's "single tool" simplicity benefit

**Verdict:** Choose **either** Biome (for pure JS/TS) **or** ESLint+Prettier+Stylelint (for comprehensive coverage). Don't mix both.
