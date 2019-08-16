import { Injectable, Put, Body } from '@nestjs/common';
import { CurdService } from '@/common/curd/curd.service';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService extends CurdService<RoleEntity, UpdateRoleDto> {
  constructor(
    @InjectRepository(RoleEntity)
    protected readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository, '角色');
  }

  async create(user: CreateRoleDto): Promise<RoleEntity> {
    const toSave = this.roleRepository.create(user);
    return await this.roleRepository.save(toSave);
  }

  @Put()
  async update(@Body() dto: UpdateRoleDto): Promise<void> {
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    await this.roleRepository.save(Object.assign(toUpdate, dto));
    return Promise.resolve();
  }
}
