const path = require('path');
const resolve = _path => path.resolve(_path);
require('fs').copyFileSync(
  resolve('packages/server/.env.production'),
  resolve('packages/server/dist/.env.production'),
);

// todo fix fail to sync .env file 
require('./_base')('server', async ssh => await ssh.execCommand('pm2 restart xf-server'), false);
