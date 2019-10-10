require('./_base')('admin', async ssh => await ssh.execCommand('nginx -s reload'));
