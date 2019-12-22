import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { TypeormService } from './common/typeorm/typeorm.service';
import { ConfigModule } from './common/config/config.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { LoginModule } from './modules/login/login.module';
import { CityModule } from './modules/city/city.module';
import { SubwayModule } from './modules/subway/subway.module';
import { PermissionModule } from './modules/permission/permission.module';
import { HouseModule } from './modules/house/house.module.';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { EmailModule } from './common/email/email.module';
import { ConfigService } from './common/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    ConfigModule,
    LoginModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    CityModule,
    SubwayModule,
    HouseModule,
    AttachmentModule,
    EmailModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.REDIS_OPTIONS,
    }),
  ],
})
export class AppModule {}
