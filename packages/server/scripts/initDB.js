const { Logger, getConfig, runCmd } = require('./utils');

Logger.log('[DB Seed]: Start, plz wait ...');
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_CHARSET, DB_COLLATE } = getConfig();

runCmd('mysql', [
  `-h${DB_HOST}`,
  `-u${DB_USERNAME}`,
  `-p${DB_PASSWORD}`,
  `-P${DB_PORT}`,
  `-e DROP DATABASE IF EXISTS \`${DB_NAME}\`;`,
  `-e CREATE DATABASE \`${DB_NAME}\` DEFAULT CHARACTER SET ${DB_CHARSET} COLLATE ${DB_COLLATE};`,
  `-e USE \`${DB_NAME}\`;`,
  `-e SHOW DATABASES;`,
  `-e SOURCE \.\/scripts\/seed\.sql;`,
])
  .then(() => Logger.log('[DB Seed]: success.'))
  .catch(err => Logger.error(`[DB Seed]: error, ${err}`));
