import { BaseService } from '../base/base.service';
import { CityEntity } from './city.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService extends BaseService<CityEntity> {
  constructor(
    @InjectRepository(CityEntity)
    protected readonly cityRepository: Repository<CityEntity>,
  ) {
    super(cityRepository, '城市');
  }
}
