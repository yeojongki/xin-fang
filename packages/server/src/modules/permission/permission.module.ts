import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@xf/common/src/entities';
import { PermissionContrller } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionContrller],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
