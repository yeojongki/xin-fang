import { Controller, Put, Body, Post, Get, Query } from '@nestjs/common';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdController } from '@/common/curd/curd.controller';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController extends CurdController<Role, UpdateRoleInput> {
  constructor(protected readonly roleService: RoleService) {
    super(roleService);
  }

  @Get('list')
  async getList(@Query() query: TListQuery<Role>): Promise<IPaginationList<IRole>> {
    return await this.roleService.getList(query, ['permissions']);
  }

  @Put()
  async update(@Body() dto: UpdateRoleInput): Promise<void> {
    await this.roleService.update(dto);
  }

  @Post()
  async create(@Body() dto: CreateRoleInput): Promise<void> {
    await this.roleService.create(dto);
  }
}
