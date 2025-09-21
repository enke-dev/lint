import expect from 'node:assert';
import { describe, it } from 'node:test';

import { ESLint } from 'eslint';

async function runEslintOnFile(filePath: string, fix = false): Promise<ESLint.LintResult> {
  const results = await new ESLint({ fix }).lintFiles([filePath]);
  return results[0];
}

}

describe('naive check that linter grabs issues', () => {
  it('finds all issues in Typescript', async () => {
    const { errorCount } = await runEslintOnFile('test/test.ts');
    expect.equal(errorCount, 6, 'TS file should have 6 issues');
  });

  it('finds all issues in markup in Typescript', async () => {
    const { errorCount } = await runEslintOnFile('test/test.html.ts');
    expect.equal(errorCount, 5, 'Markup in TS file should have 5 issues');
  });

  it('finds all issues in Lit components', async () => {
    const { errorCount } = await runEslintOnFile('test/test.component.ts');
    expect.equal(errorCount, 4, 'Lit component file should have 4 issues');
  });

  it('finds all issues in HTML', async () => {
    const { errorCount } = await runEslintOnFile('test/test.html');
    expect.equal(errorCount, 18, 'HTML file should have 18 issues');
  });

  it('finds all issues in JSON', async () => {
    const { errorCount } = await runEslintOnFile('test/test.json');
    expect.equal(errorCount, 3, 'JSON file should have 2 issues');
  });
});

describe('naive check that linter can fix issues', () => {
  it('applies fixable issues in Typescript', async () => {
    const { errorCount } = await runEslintOnFile('test/test.ts', true);
    expect.equal(errorCount, 3, 'TS file should have 3 remaining unfixable issues');
  });

  it('applies fixable issues in markup in Typescript', async () => {
    const { errorCount } = await runEslintOnFile('test/test.html.ts', true);
    expect.equal(errorCount, 5, 'Markup in TS file should not have been fixed');
  });

  it('applies fixable issues in Lit components', async () => {
    const { errorCount } = await runEslintOnFile('test/test.component.ts', true);
    expect.equal(errorCount, 1, 'Lit component file should have 1 remaining unfixable issue');
  });

  it('applies fixable issues in HTML', async () => {
    const { errorCount } = await runEslintOnFile('test/test.html', true);
    expect.equal(errorCount, 16, 'HTML file should have 16 remaining unfixable issues');
  });

  it('applies fixable issues in JSON', async () => {
    const { errorCount } = await runEslintOnFile('test/test.json', true);
    expect.equal(errorCount, 2, 'JSON file should have 2 remaining unfixable issues');
  });
});
