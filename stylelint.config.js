/**
 * @param {string} prefix
 * @returns {import('stylelint').Config}
 */
export const defineConfig = prefix => ({
  extends: ['stylelint-config-standard-scss', 'stylelint-config-rational-order'],
  rules: {
    'custom-property-pattern': [
      `^-?${prefix}-[a-z0-9]*(-[a-z0-9]+)*$`,
      {
        message: `Custom properties should be written in lowercase with hyphens starting with \`--${prefix}-\` (or internals with a triple-slash \`---${prefix}-\`)`,
      },
    ],
    'declaration-empty-line-before': null,
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
