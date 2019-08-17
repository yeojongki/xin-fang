import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Connection } from 'typeorm';
import { RoleModule } from './modules/role/role.module';
import { LoginModule } from './modules/login/login.module';
import { CityModule } from './common/city/city.module';
import { SubwayModule } from './common/subway/subway.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LoginModule,
    AuthModule,
    UserModule,
    RoleModule,
    CityModule,
    SubwayModule
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
