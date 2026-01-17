import { describe, it, suite } from 'node:test';

import { ESLint } from 'eslint';

import { strictEqual } from './test.helpers.ts';

async function runEslintOnFile(filePath: string, fix = false): Promise<ESLint.LintResult> {
  const results = await new ESLint({ fix }).lintFiles([filePath]);
  return results[0];
}

suite('eslint', () => {
  describe('naive check that eslint grabs issues', () => {
    it('finds all issues in Typescript', async () => {
      const { errorCount } = await runEslintOnFile('test/test.ts');
      strictEqual(errorCount, 6, 'TS file should have %d issues');
    });

    it('finds all issues in markup in Typescript', async () => {
      const { errorCount } = await runEslintOnFile('test/test.html.ts');
      strictEqual(errorCount, 5, 'Markup in TS file should have %d issues');
    });

    it('finds all issues in Lit components', async () => {
      const { errorCount } = await runEslintOnFile('test/test.component.ts');
      strictEqual(errorCount, 4, 'Lit component file should have %d issues');
    });

    it('finds all issues in HTML', async () => {
      const { errorCount } = await runEslintOnFile('test/test.html');
      strictEqual(errorCount, 7, 'HTML file should have %d issues');
    });

    it('finds all issues in JSON', async () => {
      const { errorCount } = await runEslintOnFile('test/test.json');
      strictEqual(errorCount, 3, 'JSON file should have %d issues');
    });
  });

  describe('naive check that eslint can fix issues', () => {
    it('applies fixable issues in Typescript', async () => {
      const { errorCount } = await runEslintOnFile('test/test.ts', true);
      strictEqual(errorCount, 3, 'TS file should have %d remaining unfixable issues');
    });

    it('applies fixable issues in markup in Typescript', async () => {
      const { errorCount } = await runEslintOnFile('test/test.html.ts', true);
      strictEqual(errorCount, 5, 'Markup in TS file should not have been fixed');
    });

    it('applies fixable issues in Lit components', async () => {
      const { errorCount } = await runEslintOnFile('test/test.component.ts', true);
      strictEqual(errorCount, 1, 'Lit component file should have %d remaining unfixable issue');
    });

    it('applies fixable issues in HTML', async () => {
      const { errorCount } = await runEslintOnFile('test/test.html', true);
      strictEqual(errorCount, 4, 'HTML file should have %d remaining unfixable issues');
    });

    it('applies fixable issues in JSON', async () => {
      const { errorCount } = await runEslintOnFile('test/test.json', true);
      strictEqual(errorCount, 2, 'JSON file should have %d remaining unfixable issues');
    });
  });
});
