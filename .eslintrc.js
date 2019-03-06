module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'jest', 'react-hooks'],
  rules: {
    // Buggy, a lot of false positive with React
    '@typescript-eslint/no-unused-vars': 0,
    // Too painful not to be able to use "any"
    '@typescript-eslint/no-explicit-any': 0,
    // Handled by Prettier
    '@typescript-eslint/indent': 0,
    quotes: 0,
    // Too much of a pain, considering components are functions.
    '@typescript-eslint/explicit-function-return-type': 0,
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  globals: {
    grecaptcha: true,
  },
};
