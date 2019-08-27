import { Controller, Put, Body, Post } from '@nestjs/common';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';
import { CurdController } from '@/common/curd/curd.controller';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController extends CurdController<Role, UpdateRoleInput> {
  constructor(protected readonly roleService: RoleService) {
    super(roleService);
  }

  @Put()
  async update(@Body() dto: UpdateRoleInput): Promise<void> {
    await this.roleService.update(dto);
    return Promise.resolve();
  }

  @Post()
  async create(@Body() dto: CreateRoleInput): Promise<Role> {
    const role = await this.roleService.create(dto);
    return role;
  }
}
