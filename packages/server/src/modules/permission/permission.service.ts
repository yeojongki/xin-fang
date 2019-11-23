import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@xf/common/src/entities';
import { UpdatePermissionInput } from '@xf/common/src/dtos/permission/update-permission.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class PermissionService extends CurdService<Permission, UpdatePermissionInput> {
  constructor(
    @InjectRepository(Permission)
    protected readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository, '权限');
  }

  async findAndCount(query: TListQuery<Permission>): Promise<[Permission[], number]> {
    const { skip, take, token, name, ...rest } = query;
    const qb = this.repository.createQueryBuilder('p');
    qb.where(rest);
    if (token) {
      qb.andWhere(`p.token LIKE '%${token}%'`);
    }
    if (name) {
      qb.andWhere(`p.name LIKE '%${name}%'`);
    }

    return qb
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
