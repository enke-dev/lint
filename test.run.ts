import expect from 'node:assert';
import { exec as _exec } from 'node:child_process';
import { describe, it } from 'node:test';
import { promisify } from 'node:util';

import type { ESLint } from 'eslint';

const exec = promisify(_exec);

async function runLinterOnFile(filePath: string, tryFix = false): Promise<ESLint.LintResult> {
  try {
    const cmd = ['eslint', '--format', 'json', filePath];
    if (tryFix) {
      cmd.push('--fix-dry-run');
    }
    const { stdout } = await exec(cmd.join(' '));
    return JSON.parse(stdout)[0];
  } catch (error) {
    const { stdout } = error as { stdout: string };
    return JSON.parse(stdout)[0];
  }
}

describe('naive check that linter grabs issues', () => {
  it('finds all issues in Typescript', async () => {
    const { errorCount } = await runLinterOnFile('test/test.ts');
    expect.equal(errorCount, 6, 'TS file should have 6 issues');
  });

  it('finds all issues in markup in Typescript', async () => {
    const { errorCount } = await runLinterOnFile('test/test.html.ts');
    expect.equal(errorCount, 5, 'Markup in TS file should have 5 issues');
  });

  it('finds all issues in Lit components', async () => {
    const { errorCount } = await runLinterOnFile('test/test.component.ts');
    expect.equal(errorCount, 4, 'Lit component file should have 4 issues');
  });

  it('finds all issues in HTML', async () => {
    const { errorCount } = await runLinterOnFile('test/test.html');
    expect.equal(errorCount, 18, 'HTML file should have 18 issues');
  });

  it('finds all issues in JSON', async () => {
    const { errorCount } = await runLinterOnFile('test/test.json');
    expect.equal(errorCount, 3, 'JSON file should have 2 issues');
  });
});

describe('naive check that linter can fix issues', () => {
  it('applies fixable issues in Typescript', async () => {
    const { errorCount } = await runLinterOnFile('test/test.ts', true);
    expect.equal(errorCount, 3, 'TS file should have 3 remaining unfixable issues');
  });

  it('applies fixable issues in markup in Typescript', async () => {
    const { errorCount } = await runLinterOnFile('test/test.html.ts', true);
    expect.equal(errorCount, 5, 'Markup in TS file should not have been fixed');
  });

  it('applies fixable issues in Lit components', async () => {
    const { errorCount } = await runLinterOnFile('test/test.component.ts', true);
    expect.equal(errorCount, 1, 'Lit component file should have 1 remaining unfixable issue');
  });

  it('applies fixable issues in HTML', async () => {
    const { errorCount } = await runLinterOnFile('test/test.html', true);
    expect.equal(errorCount, 16, 'HTML file should have 16 remaining unfixable issues');
  });

  it('applies fixable issues in JSON', async () => {
    const { errorCount } = await runLinterOnFile('test/test.json', true);
    expect.equal(errorCount, 2, 'JSON file should have 2 remaining unfixable issues');
  });
});
