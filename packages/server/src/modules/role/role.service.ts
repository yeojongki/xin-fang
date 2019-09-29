import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { Permission } from '@xf/common/src/entities';
import { CurdService } from '@/common/curd/curd.service';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';

@Injectable()
export class RoleService extends CurdService<Role, UpdateRoleInput> {
  constructor(
    @InjectRepository(Role)
    protected readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly PermissionRepository: Repository<Permission>,
  ) {
    super(roleRepository, '角色');
  }

  async update(dto: UpdateRoleInput): Promise<Role> {
    const { id, permissions } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    if (permissions) {
      toUpdate.permissions = await this.PermissionRepository.findByIds(permissions);
    }
    return await this.repository.save(Object.assign(dto, toUpdate));
  }

  async create(dto: CreateRoleInput): Promise<void> {
    const toCreate = dto;
    const { permissions } = dto;
    let toSavePermissions: Permission[] = [];
    if (permissions) {
      toSavePermissions = await this.PermissionRepository.findByIds(permissions);
    }
    const toSave = this.roleRepository.create({ ...toCreate, permissions: toSavePermissions });
    await this.roleRepository.save(toSave);
  }
}
