import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // Ignorer les dossiers de build et dépendances
  {
    ignores: ['node_modules/', 'dist/'],
  },

  // Configuration pour les fichiers TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Ajout des règles professionnelles
    rules: {
      // INTERDICTION DU TYPE ANY (Règle d'or)
      '@typescript-eslint/no-explicit-any': 'error',

      // Autoriser les variables non utilisées commençant par _ (ex: _req, _next)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Forcer l'utilisation de await pour les promesses (évite les bugs async)
      '@typescript-eslint/await-thenable': 'error',

      // Empêcher les promesses flottantes
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Désactive les conflits avec Prettier
  prettierConfig,
);
