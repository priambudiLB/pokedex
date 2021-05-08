module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.12.0',
    },
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
