import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { Permission } from '@xf/common/src/entities';
import { CurdService } from '@/common/curd/curd.service';

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
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    if (dto.permissions) {
      toUpdate.permissions = await this.PermissionRepository.findByIds(dto.permissions);
    }
    return await this.repository.save(Object.assign(dto, toUpdate));
  }
}
