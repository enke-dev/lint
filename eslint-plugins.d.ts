declare module 'eslint-plugin-html' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;

  export default plugin;
}

declare module 'eslint-plugin-import-extensions' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;

  export default plugin;
}

declare module 'eslint-plugin-import' {
  import type { Linter } from 'eslint';

  export const js: {
    readonly flatConfigs: {
      readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
    };
  };

  export default js;
}

declare module 'eslint-plugin-lit-a11y' {
  import type { ESLint, Linter } from 'eslint';

  export const configs: {
    readonly recommended: {
      readonly rules: Readonly<Linter.RulesRecord>;
    };
  };

  const plugin: ESLint.Plugin & {
    readonly configs;
  };

  export default plugin;
}
