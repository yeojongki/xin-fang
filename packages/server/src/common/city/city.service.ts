import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from '@xf/common/entities/city.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class CityService extends BaseService<City> {
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

    const city = await this.cityRepository.findOne(cityId, { relations: ['subways'] });
    return city;
  }
}
