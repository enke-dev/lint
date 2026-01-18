import { strictEqual as _strictEqual } from 'node:assert';
import { exec } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';

export const execAsync = promisify(exec);

/**
 * Format strictEqual message with expected value
 */
export function strictEqual(actual: number, expected: number, message: string) {
  const formattedMessage = message.replace('%d', expected.toString());
  _strictEqual(actual, expected, formattedMessage);
}

/**
 * Helper to preserve file state during tests
 */
export async function withFileReset<T>(
  filePath: string,
  fn: () => Promise<T>
): Promise<T> {
  const original = await readFile(filePath, 'utf-8');
  try {
    return await fn();
  } finally {
    await writeFile(filePath, original, 'utf-8');
  }
}
