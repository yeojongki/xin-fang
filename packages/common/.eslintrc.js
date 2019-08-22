const { strictEslint } = require('@umijs/fabric');

strictEslint.rules = {
  ...strictEslint.rules,
  'import/no-unresolved': [2, { ignore: ['^@/', '^@xf/'] }],
  'class-methods-use-this': 0,
};
module.exports = {
  ...strictEslint,
};
