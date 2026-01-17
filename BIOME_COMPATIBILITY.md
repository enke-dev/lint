# Biome Compatibility Report

This document lists rules from the existing ESLint, Prettier, and Stylelint configurations that cannot be fully replicated in Biome.

## Overview

Biome is a unified, fast alternative to ESLint + Prettier + Stylelint. While it covers many common linting and formatting rules, some specialized features and plugins are not yet supported.

## ESLint Rules Not Available in Biome

### HTML Linting Rules
Biome's HTML support is experimental and provides basic linting only. The following `@html-eslint` rules are not available:

- `@html-eslint/*` - Most HTML-specific rules (Biome has basic HTML support but limited rule coverage)
- Note: Enable experimental HTML support via `html.experimentalFullSupportEnabled: true`

### Web Components & Lit Rules
Biome does not have plugin support, so these Web Components-specific rules cannot be implemented:

- `wc/*` - All Web Components specific rules (no Biome equivalent)
- `lit/*` - All Lit component rules (no Biome equivalent)
- `lit-a11y/*` - All Lit accessibility rules (no Biome equivalent)

### Import Organization Rules
Some advanced import management features differ from ESLint plugins:

- `simple-import-sort/imports` - Custom import grouping with configurable groups (Biome has basic sorting but not customizable groups)
- `import-extensions/require-extensions` - Specific extension enforcement (Biome has `useImportExtensions` but behavior differs)
- `import/first` - Import positioning (Biome may handle differently)
- ✅ `import/enforce-node-protocol-usage` - **Supported** via `style.useNodejsImportProtocol`

### Other ESLint Rules
- `package-json/*` - Package.json specific linting (no Biome equivalent)

## Prettier Plugin Features Not Available

- `@awmottaz/prettier-plugin-void-html` - Self-closing void tags
  - ✅ **Partial support**: Biome has `html.formatter.selfCloseVoidElements: true`
- `prettier-plugin-css-order` - CSS property ordering (no Biome equivalent)

## Stylelint Rules Not Available

### Property Ordering
- `stylelint-config-rational-order` - Property ordering with semantic groups (limited/no support in Biome)
- `stylelint-order/properties-order` - Custom property order rules (no Biome equivalent)

### SCSS Support
- ⚠️ **Important**: Biome only supports standard CSS syntax, **NOT SCSS**
- `stylelint-config-standard-scss` rules cannot be applied
- SCSS-specific features (mixins, `@extend`, SCSS variables) are not supported
- Note: CSS nesting is now part of standard CSS and is supported by Biome

### Custom Property Patterns
- `custom-property-pattern` with prefix - May not be configurable in Biome (needs verification)

## Rules Successfully Mapped to Biome

The following rules have been successfully mapped from ESLint/Prettier/Stylelint to Biome:

### JavaScript/TypeScript
- ✅ `no-unused-vars` → `correctness.noUnusedVariables`
- ✅ `no-unused-imports` → `correctness.noUnusedImports`
- ✅ `no-console` → `correctness.noConsole`
- ✅ `import/consistent-type-specifier-style` → `style.useImportType`
- ✅ `semi` → `javascript.formatter.semicolons`
- ✅ `quotes` → `javascript.formatter.quoteStyle`

### Formatting
- ✅ `printWidth` → `formatter.lineWidth`
- ✅ `tabWidth` → `formatter.indentWidth`
- ✅ `useTabs` → `formatter.indentStyle`
- ✅ `endOfLine` → `formatter.lineEnding`
- ✅ `singleQuote` → `javascript.formatter.quoteStyle`
- ✅ `trailingComma` → `javascript.formatter.trailingCommas`
- ✅ `arrowParens` → `javascript.formatter.arrowParentheses`
- ✅ `bracketSpacing` → `javascript.formatter.bracketSpacing`

### JSON
- ✅ JSON linting and formatting (fully supported)
- ✅ `allowComments` → `json.parser.allowComments`
- ✅ `allowTrailingCommas` → `json.parser.allowTrailingCommas`

### CSS
- ✅ Basic CSS linting and formatting (standard CSS only)
- ✅ `quoteStyle` → `css.formatter.quoteStyle`

### HTML
- ✅ Basic HTML linting and formatting (experimental)
- ✅ `indentScriptAndStyle` → `html.formatter.indentScriptAndStyle`
- ✅ Void element self-closing → `html.formatter.selfCloseVoidElements`

## Recommendations

### When to Use Biome
- Projects using standard JavaScript/TypeScript/JSON/CSS
- Projects that prioritize performance (Biome is 10-20x faster)
- Projects that want a unified toolchain instead of multiple tools
- Projects not using SCSS or Web Components

### When to Keep ESLint + Prettier + Stylelint
- Projects using SCSS (Biome only supports standard CSS)
- Projects using Web Components or Lit (requires `eslint-plugin-wc`, `eslint-plugin-lit`)
- Projects requiring extensive HTML linting rules
- Projects requiring custom import grouping rules
- Projects requiring CSS property ordering plugins

### Hybrid Approach
You can use both approaches in different parts of your project:
- Biome for fast linting/formatting of standard JS/TS/JSON files
- ESLint/Stylelint for specialized linting (HTML, SCSS, Web Components)

## Future Improvements

As Biome develops, the following features may become available:

1. **Plugin System**: Would enable Web Components, Lit, and custom rules
2. **SCSS Support**: Currently on the roadmap
3. **Enhanced HTML Support**: More comprehensive HTML linting rules
4. **Custom Import Groups**: More configurable import sorting
5. **CSS Property Ordering**: Semantic property grouping

## Testing Notes

The Biome test suite in `test.run.biome.ts` uses relaxed assertions (`errorCount > 0` instead of exact counts) because Biome may detect different issues than ESLint/Stylelint. This is expected and documented behavior.

## References

- [Biome Language Support](https://biomejs.dev/internals/language-support/)
- [Biome Configuration Reference](https://biomejs.dev/reference/configuration/)
- [Biome Rules Sources](https://biomejs.dev/linter/rules-sources/)
- [Biome 2025 Roadmap](https://biomejs.dev/blog/roadmap-2025/)
