// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  // Ignore build and dependencies
  { ignores: ['node_modules', 'dist'] },

  // Apply rules to all JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module', // better for modern JS
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules, // start with ESLint recommended

      // Junior-friendly tweaks
      'no-console': 'off', // allow console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // warn instead of error
      eqeqeq: ['warn', 'always'], // prefer === and !==
      curly: 'warn', // always use curly braces
      'no-var': 'error', // enforce let/const
      'prefer-const': 'warn', // prefer const when possible
      semi: ['warn', 'always'], // enforce semicolons
      quotes: ['warn', 'single'], // single quotes
    },
  },

  // Prettier rules (last)
  prettier,
];
