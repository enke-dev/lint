import type { Config } from 'prettier';

const config: Config = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  jsxSingleQuote: false,
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  plugins: ['@awmottaz/prettier-plugin-void-html', 'prettier-plugin-css-order'],
};

export default config;
