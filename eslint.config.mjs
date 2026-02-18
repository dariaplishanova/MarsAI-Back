import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['node_modules/', 'dist/'],
  },

  // Base configuration for all TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Explicitly point to the tsconfig
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Add Prettier config to disable conflicting rules
  prettierConfig,
);
