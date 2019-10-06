import { Injectable } from '@nestjs/common';
import { RoleService } from '@/modules/role/role.service';
import { rolesSeed, permissionsSeed, usersSeed } from './seed.data';
import { UserService } from '@/modules/user/user.service';
import { PermissionService } from '@/modules/permission/permission.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  /* eslint-disable eslint-comments/disable-enable-pair */
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */

  async initUsers() {
    for (const data of usersSeed) {
      this.userService.create(data);
    }
  }

  async initRoles() {
    for (const data of rolesSeed) {
      this.roleService.create(data);
    }
  }

  async initPermissions() {
    for (const data of permissionsSeed) {
      this.permissionService.create(data);
    }
  }
}
