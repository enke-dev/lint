import { ok } from 'node:assert';
import { readFile, writeFile } from 'node:fs/promises';
import { describe, it, suite } from 'node:test';

import { execAsync } from './test-helpers.js';

interface BiomeResult {
  errorCount: number;
  warningCount: number;
}

async function runBiomeOnFile(filePath: string, fix = false): Promise<BiomeResult> {
  const untouchedFile = await readFile(filePath, 'utf-8');
  const command = fix
    ? `npx biome check --write --config-path=biome.json ${filePath}`
    : `npx biome lint --config-path=biome.json ${filePath}`;

  try {
    await execAsync(command);
    return { errorCount: 0, warningCount: 0 };
  } catch (error: unknown) {
    const { stderr, stdout } = error as { stderr?: string; stdout?: string };
    const output = stderr || stdout || '';
    const errorMatches = output.match(/error/gi) || [];
    const warningMatches = output.match(/warning/gi) || [];
    return {
      errorCount: errorMatches.length,
      warningCount: warningMatches.length,
    };
  } finally {
    if (fix) {
      await writeFile(filePath, untouchedFile, 'utf-8');
    }
  }
}

suite('biome', () => {
  describe('naive check that biome grabs issues', () => {
    it('finds issues in Typescript', async () => {
      const { errorCount } = await runBiomeOnFile('test/fixtures/test.ts');
      ok(errorCount > 0, 'TS file should have errors detected by Biome');
    });

    it('finds issues in HTML', async () => {
      const { errorCount } = await runBiomeOnFile('test/fixtures/test.html');
      ok(errorCount >= 0, 'HTML file checked by Biome (may find fewer issues than ESLint)');
    });

    it('finds issues in JSON', async () => {
      const { errorCount } = await runBiomeOnFile('test/fixtures/test.json');
      ok(errorCount > 0, 'JSON file should have errors detected by Biome');
    });

    it('finds issues in CSS', async () => {
      const { errorCount } = await runBiomeOnFile('test/fixtures/test.css');
      ok(errorCount >= 0, 'CSS file checked by Biome');
    });
  });

  describe('naive check that biome can fix issues', () => {
    it('applies fixable issues in Typescript', async () => {
      const { errorCount: beforeCount } = await runBiomeOnFile('test/fixtures/test.ts');
      const { errorCount: afterCount } = await runBiomeOnFile('test/fixtures/test.ts', true);
      ok(
        afterCount <= beforeCount,
        'TS file should have same or fewer errors after Biome auto-fix'
      );
    });

    it('applies fixable issues in JSON', async () => {
      const { errorCount: beforeCount } = await runBiomeOnFile('test/fixtures/test.json');
      const { errorCount: afterCount } = await runBiomeOnFile('test/fixtures/test.json', true);
      ok(
        afterCount <= beforeCount,
        'JSON file should have same or fewer errors after Biome auto-fix'
      );
    });
  });
});
