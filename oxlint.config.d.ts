/**
 * Oxlint configuration for JavaScript and TypeScript projects
 * This is an alternative to the ESLint configuration
 *
 * Note: Oxlint focuses on linting (correctness, performance, best practices)
 * You should still use Prettier for code formatting
 */
declare const _default: {
    categories: {
        correctness: "error";
        perf: "warn";
        suspicious: "warn";
    };
    plugins: ("react" | "unicorn" | "typescript" | "import" | "jsx-a11y")[];
    ignorePatterns: string[];
    env: {
        browser: true;
        es2024: true;
        node: true;
    };
    rules: {
        curly: "error";
        'no-console': "error";
        'no-unused-vars': (string | {
            argsIgnorePattern: string;
            varsIgnorePattern: string;
            caughtErrors: string;
        })[];
        'no-unused-expressions': (string | {
            allowShortCircuit: boolean;
            allowTernary: boolean;
        })[];
        'import/no-cycle': "error";
        'import/no-self-import': "error";
        'import/no-useless-path-segments': "error";
        'import/no-duplicates': "error";
        'typescript/no-explicit-any': "warn";
        'typescript/no-unused-vars': "off";
        'jsx-a11y/alt-text': "error";
        'jsx-a11y/anchor-has-content': "error";
        'jsx-a11y/anchor-is-valid': "error";
        'jsx-a11y/aria-props': "error";
        'jsx-a11y/aria-proptypes': "error";
        'jsx-a11y/aria-unsupported-elements': "error";
        'jsx-a11y/heading-has-content': "error";
        'jsx-a11y/html-has-lang': "error";
        'jsx-a11y/iframe-has-title': "error";
        'jsx-a11y/img-redundant-alt': "error";
        'jsx-a11y/no-access-key': "error";
        'unicorn/no-null': "off";
        'unicorn/prefer-node-protocol': "error";
    };
    overrides: {
        files: string[];
        rules: {
            'typescript/no-explicit-any': "off";
            'no-console': "off";
        };
    }[];
};
export default _default;
