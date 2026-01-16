import { ok } from 'node:assert';
import { readFile, writeFile } from 'node:fs/promises';
import { describe, it, suite } from 'node:test';

import { ESLint } from 'eslint';
import { check, resolveConfig } from 'prettier';
import Stylelint from 'stylelint';

import { strictEqual } from './test.helpers.js';

async function runEslintOnFile(filePath: string, fix = false): Promise<ESLint.LintResult> {
  const results = await new ESLint({ fix }).lintFiles([filePath]);
  return results[0];
}

async function runPrettierOnFile(filePath: string): Promise<boolean> {
  const source = await readFile(filePath, 'utf-8');
  const config = await resolveConfig(filePath);

  try {
    return await check(source, { ...config, filepath: filePath });
  } catch (error) {
    // when prettier throws an error, it means the file is malformed
    return false;
  }
}

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

suite('prettier', () => {
  describe('naive check that prettier grabs issues', () => {
    it('finds malformed Typescript', async () => {
      const result = await runPrettierOnFile('test/test.ts');
      ok(!result, 'TS file not detected as malformed');
    });

    it('finds malformed HTML', async () => {
      const result = await runPrettierOnFile('test/test.html');
      ok(!result, 'HTML file not detected as malformed');
    });

    it('finds malformed JSON', async () => {
      const result = await runPrettierOnFile('test/test.json');
      ok(!result, 'JSON file not detected as malformed');
    });
  });
});

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
