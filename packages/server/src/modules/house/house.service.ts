import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '@xf/common/src/entities';
import { UpdateHouseInput } from '@xf/common/src/dtos/house/update-house.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class HouseService extends CurdService<House, UpdateHouseInput> {
  constructor(
    @InjectRepository(House)
    protected readonly houseRepository: Repository<House>,
  ) {
    super(houseRepository, '房子');
  }

  async findAndCount(query: TListQuery<House>): Promise<[House[], number]> {
    const { skip, take, name } = query;
    const qb = this.repository.createQueryBuilder('q');
    if (name) {
      qb.andWhere(`q.name LIKE '%${name}%'`);
    }

    return qb
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
