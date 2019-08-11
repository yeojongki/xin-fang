import { Injectable } from '@nestjs/common';
import { CommonService } from '@/common/common.service';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService extends CommonService<RolesEntity> {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {
    super(rolesRepository);
  }
}
