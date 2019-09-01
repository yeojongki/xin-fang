import { Controller, Put, Body, Post, UseGuards, Get, Query } from '@nestjs/common';
import { Role } from '@xf/common/src/entities/role.entity';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';
import { SUPER_ADMIN } from '@xf/common/src/constants/roles.const';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { CurdController } from '@/common/curd/curd.controller';
import { RoleService } from './role.service';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';

@Controller('role')
export class RoleController extends CurdController<Role, UpdateRoleInput> {
  constructor(protected readonly roleService: RoleService) {
    super(roleService);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SUPER_ADMIN)
  @Get('list')
  async getList(
    @Query('current') skip: number = 1,
    @Query('pageSize') take: number = DEFAULT_PAGE_SIZE,
  ): Promise<IPaginationList<IRole>> {
    return await this.roleService.getList(skip - 1, take);
  }

  @Put()
  async update(@Body() dto: UpdateRoleInput): Promise<void> {
    await this.roleService.update(dto);
    return Promise.resolve();
  }

  @Post()
  async create(@Body() dto: CreateRoleInput): Promise<void> {
    await this.roleService.create(dto);
    return Promise.resolve();
  }
}
