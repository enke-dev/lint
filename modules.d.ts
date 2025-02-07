declare module 'eslint-plugin-import' {
  import type { Linter } from 'eslint';

  export const js: {
    readonly flatConfigs: {
      readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
    };
  };

  export default js;
}
