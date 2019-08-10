import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { Connection } from 'typeorm';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, RolesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
