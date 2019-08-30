import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class RoleService extends CurdService<Role, UpdateRoleInput> {
  constructor(
    @InjectRepository(Role)
    protected readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository, '角色');
  }
}
