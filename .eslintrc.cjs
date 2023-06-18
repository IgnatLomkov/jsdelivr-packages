/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
}
