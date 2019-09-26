import { Controller, Put, Body, Post, Get, Query } from '@nestjs/common';
import { Permission } from '@xf/common/src/entities';
import { UpdatePermissionInput } from '@xf/common/src/dtos/permission/update-permission.input';
import { CreatePermissionInput } from '@xf/common/src/dtos/permission/create-permission.input';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { PermissionService } from './permission.service';
import { ParseListQuery } from '@/pipes/parse-list-query.pipe';
import { CurdController } from '@/common/curd/curd.controller';

@Controller('permission')
export class PermissionContrller extends CurdController<Permission, UpdatePermissionInput> {
  constructor(protected readonly permissionService: PermissionService) {
    super(permissionService);
  }

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
