import { defineConfig } from 'oxlint';

// used to lint this repo itself
export default defineConfig({
  // Enable recommended rule categories
  categories: {
    correctness: 'error',
    perf: 'warn',
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
    'test/',
  ],

  // Environment settings
  env: {
    browser: true,
    es2024: true,
    node: true,
  },

  // Specific rule configurations
  rules: {
    curly: 'error',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'none',
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-duplicates': 'error',
    'typescript/no-explicit-any': 'warn',
    'typescript/no-unused-vars': 'off',
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
    'unicorn/no-null': 'off',
    'unicorn/prefer-node-protocol': 'error',
  },

  // File-specific overrides
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**'],
      rules: {
        'typescript/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
  ],
});
