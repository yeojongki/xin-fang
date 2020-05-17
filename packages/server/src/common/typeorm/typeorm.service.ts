import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entities from '@xf/common/src/entities';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  /** eslint-ignore */
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.configService.DB_HOST,
      port: this.configService.DB_PORT,
      charset: this.configService.DB_CHARSET,
      username: this.configService.DB_USERNAME,
      password: this.configService.DB_PASSWORD,
      database: this.configService.DB_NAME,
      synchronize: true,
      // logging: ['query'],
      entities: Object.values(Entities),
      keepConnectionAlive: true,
    };
    return options;
  }
}
