import { Controller, Put, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Message } from '@/decorators/http.decorator';
import { CommonController } from '@/common/common.controller';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RoleController extends CommonController<RoleEntity> {
  constructor(private readonly RoleService: RoleService) {
    super(RoleService);
  }

  @Post()
  async create(@Body() entity: CreateRoleDto) {
    return await this.RoleService.create(entity);
  }

  @Put()
  async update(@Body() entity: RoleEntity) {
    return await this.RoleService.update(entity);
  }
}
