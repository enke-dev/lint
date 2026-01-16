import { strictEqual as _strictEqual } from 'node:assert';

export function strictEqual(actual: number, expected: number, message: string) {
  const formattedMessage = message.replace('%d', expected.toString());
  _strictEqual(actual, expected, formattedMessage);
}
