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
      type: this.configService.get('DB_TYPE'),
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      charset: this.configService.get('DB_CHARSET'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      synchronize: true,
      // logging: ['query'],
      entities: Object.values(Entities),
      keepConnectionAlive: true,
    };
    return options;
  }
}
