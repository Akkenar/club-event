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
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-useless-escape': 1,
    // Handled by Prettier
    '@typescript-eslint/indent': 0,
    quotes: 0,
  },
  globals: {
    grecaptcha: true,
  },
};
