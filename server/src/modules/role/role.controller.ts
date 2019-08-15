import { Controller, Put, Body, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CurdController } from '@/common/curd/curd.controller';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController extends CurdController<RoleEntity, UpdateRoleDto> {
  constructor(protected readonly roleService: RoleService) {
    super(roleService);
  }

  @Put()
  async update(@Body() dto: UpdateRoleDto): Promise<any> {
    return await this.roleService.update(dto);
  }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }
}
