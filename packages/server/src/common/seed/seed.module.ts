import { Module } from '@nestjs/common';
import { SeedService } from '@/common/seed/seed.service';
import { UserModule } from '@/modules/user/user.module';
import { RoleModule } from '@/modules/role/role.module';
import { PermissionModule } from '@/modules/permission/permission.module';

@Module({
  imports: [UserModule, RoleModule, PermissionModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
