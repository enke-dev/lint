import * as voidHtmlPlugin from '@awmottaz/prettier-plugin-void-html';
import type { Config } from 'prettier';
import * as cssOrderPlugin from 'prettier-plugin-css-order';

const config: Config = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  jsxSingleQuote: false,
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  plugins: [voidHtmlPlugin, cssOrderPlugin],
};

export default config;
