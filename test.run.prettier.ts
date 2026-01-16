import { ok } from 'node:assert';
import { readFile } from 'node:fs/promises';
import { describe, it, suite } from 'node:test';

import { check, resolveConfig } from 'prettier';

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
