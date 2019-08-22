module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'xin-fang',
  entities: [__dirname + 'src/**/**.entity{.ts,.js}'],
  synchronize: true,
};
