const { strictEslint } = require('@umijs/fabric');

strictEslint.rules = {
  ...strictEslint.rules,
  'import/no-unresolved': [2, { ignore: ['^@/', '^@xf/', 'umi-types'] }],
  'class-methods-use-this': 0,
  '@typescript-eslint/no-explicit-any': 0,
  'no-console': 0,
  'no-unused-expressions': [2, { allowShortCircuit: true }],
};

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
