import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '@xf/common/src/entities/city.entity';
import { UpdateCityInput } from '@xf/common/src/dtos/city/update-city.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class CityService extends CurdService<City, UpdateCityInput> {
  constructor(
    @InjectRepository(City)
    protected readonly cityRepository: Repository<City>,
  ) {
    super(cityRepository, '城市');
  }

  async getSubways(cityId: number): Promise<City | undefined> {
    // return await this.cityRepository
    //   .createQueryBuilder('city')
    //   .leftJoinAndSelect('city.subways', 'subways')
    //   .where('city.id = :cityId', { cityId })
    //   .getMany();

    return await this.cityRepository.findOne(cityId, { relations: ['subways'] });
  }

  async findAndCount(query: TListQuery<City>): Promise<[City[], number]> {
    const { skip, take, name, status } = query;
    const qb = this.repository.createQueryBuilder('q');
    if (name) {
      qb.andWhere(`q.name LIKE '%${name}%'`);
    }
    // transform status
    const s = Number(status);
    if (s === 0 || s === 1) {
      qb.andWhere(`q.status = ${s}`);
    }

    return qb
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }
}
