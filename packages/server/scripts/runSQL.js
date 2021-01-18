const fs = require('fs');
const path = require('path');
const { Logger, getConfig, runCmd } = require('./utils');
const parser = require('yargs-parser');
const argv = parser(process.argv.slice(2));

Logger.log('[Run SQL]: 🚀 Start, plz wait ...');
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST } = getConfig();

// get file
const fileName = argv._[0] || argv.p || argv.path;
const file = path.resolve(__dirname, 'sql', fileName);

if (!fs.existsSync(file)) {
  Logger.error(`[Run SQL]: ${fileName} is not exist!`);
}

runCmd('mysql', [
  `-h${DB_HOST}`,
  `-u${DB_USERNAME}`,
  `-p${DB_PASSWORD}`,
  `-P${DB_PORT}`,
  `-e USE \`${DB_NAME}\`;`,
  `-e SOURCE \.\/scripts\/seed\.sql;`,
])
  .then(() => Logger.log('[Run SQL]: 🚀 success.'))
  .catch((err) => Logger.error(`[Run SQL]: error, ${err}`));
