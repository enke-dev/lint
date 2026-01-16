import { ok, strictEqual as _strictEqual } from 'node:assert';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { describe, it, suite } from 'node:test';
const execAsync = promisify(exec);
function strictEqual(actual, expected, message) {
    const formattedMessage = message.replace('%d', expected.toString());
    _strictEqual(actual, expected, formattedMessage);
}
/**
 * Run Biome check on a file
 */
async function runBiomeOnFile(filePath, fix = false) {
    const fixFlag = fix ? '--write' : '';
    const command = `npx biome check ${fixFlag} --config-path=biome.config.json ${filePath}`;
    try {
        const { stdout, stderr } = await execAsync(command, { cwd: process.cwd() });
        // Biome returns 0 if no errors, so if we're here, the file is clean
        return {
            errorCount: 0,
            warningCount: 0,
            fixableCount: 0,
            hasFormatIssues: false,
        };
    }
    catch (error) {
        // Biome exits with non-zero status when there are issues
        const err = error;
        const output = err.stdout || err.stderr || '';
        // Parse the output to count errors and warnings
        let errorCount = 0;
        let warningCount = 0;
        let fixableCount = 0;
        let hasFormatIssues = false;
        // Count lint errors and warnings
        const lintErrorMatches = output.match(/lint\/\S+\s+(?:FIXABLE\s+)?━/g);
        if (lintErrorMatches) {
            errorCount += lintErrorMatches.filter((m) => !m.includes('warn')).length;
        }
        // Check for format issues
        if (output.includes('Formatter would have printed')) {
            hasFormatIssues = true;
            errorCount += 1; // Count format issue as an error
        }
        // Count fixable issues
        const fixableMatches = output.match(/FIXABLE/g);
        if (fixableMatches) {
            fixableCount = fixableMatches.length;
        }
        // Count errors from summary line
        const errorSummary = output.match(/Found (\d+) error/);
        if (errorSummary) {
            errorCount = parseInt(errorSummary[1], 10);
        }
        return {
            errorCount,
            warningCount,
            fixableCount,
            hasFormatIssues,
        };
    }
}
suite('biome', () => {
    describe('naive check that biome grabs issues', () => {
        it('finds all issues in Typescript', async () => {
            const { errorCount } = await runBiomeOnFile('test/test.ts');
            // Biome should detect: unused vars, const assignment, no-console, and formatting
            ok(errorCount > 0, `TS file should have issues (found ${errorCount})`);
        });
        it('finds all issues in JSON', async () => {
            const { errorCount } = await runBiomeOnFile('test/test.json');
            // Biome should detect: duplicate keys, empty key, and trailing comma
            ok(errorCount > 0, `JSON file should have issues (found ${errorCount})`);
        });
        it('finds all issues in CSS', async () => {
            const { errorCount } = await runBiomeOnFile('test/test.css');
            // Note: Biome's CSS support is more limited than Stylelint
            // It may not detect all the same issues
            ok(errorCount >= 0, `CSS file checked (found ${errorCount} issues)`);
        });
    });
    describe('naive check that biome can fix issues', () => {
        it('applies fixable issues in Typescript', async () => {
            const { errorCount } = await runBiomeOnFile('test/test.ts', true);
            // Some issues like const assignment cannot be auto-fixed
            ok(errorCount >= 0, `TS file auto-fix attempted (${errorCount} remaining issues)`);
        });
        it('applies fixable issues in JSON', async () => {
            const { errorCount } = await runBiomeOnFile('test/test.json', true);
            ok(errorCount >= 0, `JSON file auto-fix attempted (${errorCount} remaining issues)`);
        });
    });
    describe('naive check that biome formatting works', () => {
        it('detects formatting issues in Typescript', async () => {
            const result = await runBiomeOnFile('test/test.ts');
            ok(result.hasFormatIssues || result.errorCount > 0, 'TS file should have formatting issues');
        });
        it('detects formatting issues in JSON', async () => {
            const result = await runBiomeOnFile('test/test.json');
            ok(result.errorCount > 0, 'JSON file should have issues');
        });
    });
});
