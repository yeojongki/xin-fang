import { Injectable } from '@nestjs/common';
import { CommonService } from '@/common/common.service';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService extends CommonService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {
    super(rolesRepository);
  }
}
