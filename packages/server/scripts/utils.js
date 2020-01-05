const path = require('path');
const dotEnv = require('dotenv');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const resolvePath = (...p) => path.resolve(__dirname, ...p);

const Logger = {
  log: (...text) => console.log(chalk.green(text)),
  error: (...text) => console.log(chalk.red(text)),
  warn: (...text) => console.log(chalk.yellow(text)),
};

function runCmd(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const runner = spawn(cmd, args, {
      stdio: 'inherit',
      pwd: resolvePath('..'),
    });
    runner.on('close', code => resolve(code));
    runner.on('error', err => reject(err));
  });
}

function getConfig() {
  const { parsed, error } = dotEnv.config({
    path: resolvePath('..', `.env.${process.env.NODE_ENV}`),
  });
  if (error) throw error;
  return parsed;
}

module.exports = {
  Logger,
  runCmd,
  resolvePath,
  getConfig,
};
