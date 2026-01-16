import { readFile, writeFile } from 'node:fs/promises';
import { describe, it, suite } from 'node:test';

import Stylelint from 'stylelint';

import { strictEqual } from './test.helpers.js';

async function runStylelintOnFile(filePath: string, fix = false): Promise<Stylelint.LintResult> {
  const untouchedFile = await readFile(filePath, 'utf-8');
  // @ts-expect-error -- we need to import the source type script file here
  // eslint-disable-next-line import/extensions
  const { defineConfig } = await import('./stylelint.config.ts');
  const config = defineConfig({ cssCustomPropertyPrefix: 'your-prefix' });
  const { results } = await Stylelint.lint({ files: filePath, config, fix, formatter: 'json' });
  // reset fixed file to original state, as we can not
  // prevent checking fixed results without writing them
  if (fix) {
    await writeFile(filePath, untouchedFile, 'utf-8');
  }
  return results[0];
}

suite('stylelint', () => {
  describe('naive check that stylelint grabs issues', () => {
    it('finds all issues in CSS', async () => {
      const { warnings } = await runStylelintOnFile('test/test.css');
      strictEqual(warnings.length, 4, 'CSS file should have %d issues');
    });
  });

  describe('naive check that stylelint can fix issues', () => {
    it('applies fixable issues in CSS', async () => {
      const { warnings } = await runStylelintOnFile('test/test.css', true);
      strictEqual(warnings.length, 2, 'CSS file should have %d remaining unfixable issues');
    });
  });
});
