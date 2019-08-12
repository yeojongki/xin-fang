import { Injectable, Put, Body } from '@nestjs/common';
import { CommonService } from '@/common/common.service';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService extends CommonService<RoleEntity, UpdateRoleDto> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository, '角色不存在');
  }

  async create(user: CreateRoleDto): Promise<RoleEntity> {
    const toSave = this.roleRepository.create(user);
    return await this.roleRepository.save(toSave);
  }

  @Put()
  async update(@Body() dto: UpdateRoleDto): Promise<void> {
    const { id } = dto;
    let toUpdate = await this.findByIdAndThrowError(id);
    await this.roleRepository.save(Object.assign(toUpdate, dto));
    return Promise.resolve();
  }
}
