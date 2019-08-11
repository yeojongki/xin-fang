import { Controller, Put, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Message } from '@/decorators/http.decorator';
import { CommonController } from '@/common/common.controller';
import { RolesEntity } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController extends CommonController<RolesEntity> {
  constructor(private readonly rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  async create(@Body() entity: CreateRoleDto) {
    return await this.rolesService.create(entity);
  }

  @Put()
  async update(@Body() entity: RolesEntity) {
    return await this.rolesService.update(entity);
  }
}
