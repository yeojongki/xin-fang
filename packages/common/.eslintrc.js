const { strictEslint } = require('@umijs/fabric');

strictEslint.rules = {
  ...strictEslint.rules,
  'import/no-unresolved': [2, { ignore: ['^@/', '^@xf/'] }],
  'class-methods-use-this': 0,
  'no-underscore-dangle': 0,
  '@typescript-eslint/no-explicit-any': 0,
};
module.exports = {
  ...strictEslint,
};
