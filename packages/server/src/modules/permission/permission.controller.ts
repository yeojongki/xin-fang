import { Controller, Put, Body, Post, UseGuards, Get, Query } from '@nestjs/common';
import { CurdController } from '@/common/curd/curd.controller';
import { Permission } from '@xf/common/src/entities';
import { UpdatePermissionInput } from '@xf/common/src/dtos/permission/update-permission.input';
import { CreatePermissionInput } from '@xf/common/src/dtos/permission/create-permission.input';
import { SUPER_ADMIN } from '@xf/common/src/constants/roles.const';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import { PermissionService } from './permission.service';
import { ParseListQuery } from '@/pipes/parse-list-query.pipe';

@Controller('permission')
export class PermissionContrller extends CurdController<Permission, UpdatePermissionInput> {
  constructor(protected readonly permissionService: PermissionService) {
    super(permissionService);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SUPER_ADMIN)
  @Get('list')
  async getList(
    @Query(ParseListQuery) query: TListQuery<Permission>,
  ): Promise<IPaginationList<Permission>> {
    return await this.permissionService.getList(query);
  }

  @Put()
  async update(@Body() dto: UpdatePermissionInput): Promise<void> {
    await this.permissionService.update(dto);
  }

  @Post()
  async create(@Body() dto: CreatePermissionInput): Promise<void> {
    await this.permissionService.create(dto);
  }
}
