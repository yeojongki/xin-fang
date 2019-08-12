import { Controller, Put, Body, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CommonController } from '@/common/common.controller';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController extends CommonController<
  RoleEntity,
  UpdateRoleDto
> {
  constructor(private readonly roleService: RoleService) {
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
