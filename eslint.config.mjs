// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'www/**', 'dist/**', '.angular/**', 'tools/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...angular.configs.tsRecommended,
  ...angular.configs.templateRecommended,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
);
