module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'yeojongki',
  password: '123456',
  database: 'xin-fang',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};
