import { Injectable, Put, Body } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@xf/common/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/dtos/role/update-role.input';
import { CreateRoleInput } from '@xf/common/dtos/role/create-role.input';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class RoleService extends CurdService<Role, UpdateRoleInput> {
  constructor(
    @InjectRepository(Role)
    protected readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository, '角色');
  }

  async create(user: CreateRoleInput): Promise<Role> {
    const toSave = this.roleRepository.create(user);
    const role = await this.roleRepository.save(toSave);
    return role;
  }

  @Put()
  async update(@Body() dto: UpdateRoleInput): Promise<void> {
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    await this.roleRepository.save(Object.assign(toUpdate, dto));
    return Promise.resolve();
  }
}
