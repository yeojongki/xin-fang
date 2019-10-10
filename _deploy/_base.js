// https://www.npmjs.com/package/node-ssh
const node_ssh = require('node-ssh');
const path = require('path');

const username = 'root';
const host = '39.108.211.141';
// const server = `${username}@${host}`;
const remoteBaseDest = '/etc/nginx/www/xin-fang/deploy/';
const privateKeyDir = 'C:\\Users\\Administrator\\.ssh\\id_rsa';

/**
 * @param deployDir 部署文件夹目录 也是 package 的名字 如 admin
 * @param afterTransfer 文件复制到远程服务器后执行的回调函数 参数为 ssh
 * @param recursive 是否递归文件夹
 */
module.exports = async (deployDir, afterTransfer, recursive = true) => {
  const localDistDir = path.resolve('./', `packages/${deployDir}/dist`);
  const log = msg => console.log(`[Deploy ${deployDir}]: ${msg}`);
  log('deploy start');
  const dest = `${remoteBaseDest}${deployDir}`;
  const ssh = new node_ssh();
  try {
    await ssh.connect({
      host,
      username,
      privateKey: privateKeyDir,
    });

    log('success to connect ssh, plz wait for puting directory...');
    // Putting entire directories
    const failed = [];
    const successful = [];
    const putDirectoryStatus = await ssh.putDirectory(localDistDir, dest, {
      recursive,
      tick: (localPath, remotePath, error) => {
        if (error) {
          failed.push(localPath);
        } else {
          successful.push(localPath);
        }
      },
    });

    log(`transfer status: ${putDirectoryStatus ? 'successful' : 'unsuccessful'}`);
    failed.length && log('failed transfers: ' + failed.join(', '));
    // successful.length && log('successful transfers: ' + successful.join(', '));
    if (afterTransfer && typeof afterTransfer === 'function') {
      log('start excute afterTransfer command');
      afterTransfer(ssh);
      log('end excute afterTransfer command');
    }
    log('deploy end');

    // exit 不用 setTimeout 有些命令会不执行
    setTimeout(() => {
      process.exit(0);
    }, 100);
  } catch (error) {
    console.error(error);
  }
};
