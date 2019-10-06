import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entities from '@xf/common/src/entities';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  /** eslint-ignore */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      charset: 'utf8mb4_unicode_ci',
      username: 'root',
      password: '123456',
      database: 'xf-test',
      // database: 'xin-fang',
      synchronize: true,
      // logging: ['query'],
      entities: Object.values(Entities),
    };
    return options;
  }
}
