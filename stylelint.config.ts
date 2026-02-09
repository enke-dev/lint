import type { Config } from 'stylelint';

/**
 * Stylelint configuration options
 */
export interface Options {
  cssCustomPropertyPrefix: string;
}

/**
 * Prepares a Stylelint configuration
 * @param options to configure options
 * @returns an options object to be used for Stylelint
 */
export const defineConfig = ({ cssCustomPropertyPrefix }: Options): Config => ({
  extends: ['stylelint-config-standard-scss', 'stylelint-config-rational-order'],
  rules: {
    'custom-property-pattern': [
      `^-?${cssCustomPropertyPrefix}-[a-z0-9]*(-[a-z0-9]+)*$`,
      {
        message: `Custom properties should be written in lowercase with hyphens starting with \`--${cssCustomPropertyPrefix}-\` (or internals with a triple-slash \`---${cssCustomPropertyPrefix}-\`)`,
      },
    ],
    'declaration-empty-line-before': null,
    'no-duplicate-selectors': true,
    'rule-empty-line-before': [
      'always-multi-line',
      { except: ['after-single-line-comment', 'first-nested'] },
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': true,
      },
    ],
  },
});
