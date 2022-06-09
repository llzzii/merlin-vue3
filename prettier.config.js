module.exports = {
  printWidth: 100,
  semi: true,
  vueIndentScriptAndStyle: true,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  'editor.formatOnSave': true,
  'eslint.validate': [
    'javascript',
    'javascriptreact',
    {
      language: 'vue',
      autoFix: true,
    },
  ],
  'eslint.autoFixOnSave': true,
  'vetur.validation.template': false,
  'prettier.eslintIntegration': true,
  'prettier.semi': false,
  'prettier.singleQuote': true,
};
