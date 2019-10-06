import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './common/seed/seed.module';
import { TypeormService } from './common/typeorm/typeorm.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { LoginModule } from './modules/login/login.module';
import { CityModule } from './modules/city/city.module';
import { SubwayModule } from './modules/subway/subway.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    SeedModule,
    LoginModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    CityModule,
    SubwayModule,
  ],
})
export class AppModule {}
