module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard', 'standard-with-typescript', 'plugin:jest/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: ['dist'],
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
