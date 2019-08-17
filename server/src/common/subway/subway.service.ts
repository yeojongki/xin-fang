import { BaseService } from '../base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubwayEntity } from './subway.entity';

@Injectable()
export class SubwayService extends BaseService<SubwayEntity> {
  constructor(
    @InjectRepository(SubwayEntity)
    protected readonly subwayRepository: Repository<SubwayEntity>,
  ) {
    super(subwayRepository, '城市');
  }
}
