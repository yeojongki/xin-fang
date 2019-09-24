import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@xf/common/src/entities';
import { UpdatePermissionInput } from '@xf/common/src/dtos/permission/update-permission.input';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class PermissionService extends CurdService<Permission, UpdatePermissionInput> {
  constructor(
    @InjectRepository(Permission)
    protected readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository, '权限');
  }
}
