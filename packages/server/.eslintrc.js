const { strictEslint } = require('@umijs/fabric');

strictEslint.rules = {
  ...strictEslint.rules,
  'import/no-unresolved': [2, { ignore: ['^@/', '^@xf/'] }],
  'class-methods-use-this': 0,
  '@typescript-eslint/no-explicit-any': 0,

  'no-console': 0,

  // for nestjs
  '@typescript-eslint/no-parameter-properties': 0,
  'no-useless-constructor': 0,
  'no-empty-function': 0,
  '@typescript-eslint/no-unused-vars': 0,
};
module.exports = {
  ...strictEslint,
};
