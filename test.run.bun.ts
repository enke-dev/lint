import { describe, expect, it } from 'bun:test';

import { ESLint } from 'eslint';

import { bun } from './configs/eslint/bun.config.ts';
import { node, nodeTypeChecked } from './configs/eslint/node.config.ts';
import type { FlatConfig } from './configs/eslint/typescript.config.ts';

// Runs under bun so the source configs (which import each other via `.js` specifiers) can be
// imported without a build. Note: the `bun: true` resolver option only changes behaviour under
// the node runtime — bun itself resolves `bun:` builtins regardless — so this suite asserts
// that the bun config accepts idiomatic bun code, plus the type-aware differential.
async function lint(filePath: string, config: FlatConfig): Promise<ESLint.LintResult> {
  const [result] = await new ESLint({ overrideConfigFile: true, overrideConfig: config }).lintFiles([
    filePath,
  ]);
  return result;
}

describe('bun config', () => {
  it('lints idiomatic bun code (bun: builtins) without errors', async () => {
    const { errorCount, messages } = await lint('test/test.bun.ts', bun);
    expect(messages.map(message => message.ruleId)).not.toContain('import/no-unresolved');
    expect(errorCount).toBe(0);
  });
});

describe('type-aware linting', () => {
  it('ignores floating promises without type information', async () => {
    const { messages } = await lint('test/test.type-checked.ts', node);
    expect(messages.map(message => message.ruleId)).not.toContain(
      '@typescript-eslint/no-floating-promises'
    );
  });

  it('flags floating promises under the type-checked config', async () => {
    const { messages } = await lint('test/test.type-checked.ts', nodeTypeChecked);
    expect(messages.map(message => message.ruleId)).toContain(
      '@typescript-eslint/no-floating-promises'
    );
  });
});
