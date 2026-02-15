/**
 * Oxlint configuration for JavaScript and TypeScript projects
 * This is an alternative to the ESLint configuration
 *
 * Note: Oxlint focuses on linting (correctness, performance, best practices)
 * You should still use Prettier for code formatting
 */

import { defineConfig } from 'oxlint';

export default defineConfig({
  // Enable recommended rule categories
  categories: {
    // Enabled by default: code that is outright wrong or useless
    correctness: 'error',
    // Code that can be written to run faster
    perf: 'warn',
    // Code that is most likely wrong or useless
    suspicious: 'warn',
  },

  // Enable plugins for additional rules
  plugins: ['typescript', 'import', 'jsx-a11y', 'react', 'unicorn'],

  // Ignore patterns (similar to .gitignore)
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.git/**',
    '**/coverage/**',
    '**/build/**',
  ],

  // Environment settings
  env: {
    browser: true,
    es2024: true,
    node: true,
  },

  // Specific rule configurations
  rules: {
    // Enforce curly braces for all control statements
    curly: 'error',

    // Disallow use of console
    'no-console': 'error',

    // Disallow unused variables (with exceptions for underscore prefixed)
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'none',
      },
    ],

    // Disallow expressions where the operation doesn't affect the value
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Import plugin rules
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-duplicates': 'error',

    // TypeScript specific rules
    'typescript/no-explicit-any': 'warn',
    'typescript/no-unused-vars': 'off', // Use base rule instead

    // React/JSX A11y rules (for web components/lit)
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',

    // Unicorn plugin rules for better practices
    'unicorn/no-null': 'off', // Allow null usage
    'unicorn/prefer-node-protocol': 'error', // Enforce node: import prefix
  },

  // File-specific overrides
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**'],
      rules: {
        // Allow any and console in tests
        'typescript/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
});
