require('./_base')('server', async ssh => await ssh.execCommand('pm2 restart xf-server'), false);
