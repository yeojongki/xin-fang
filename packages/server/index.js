const moduleAlias = require('module-alias');

moduleAlias.addPath(__dirname);
moduleAlias.addAliases({
  '@xf/common': 'dist/common',
  '@': 'dist/server/src',
});

moduleAlias({});
require('dist/server/src/main');
