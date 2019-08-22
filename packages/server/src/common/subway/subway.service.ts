import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subway } from '@xf/common/entities/subway.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class SubwayService extends BaseService<Subway> {
  constructor(
    @InjectRepository(Subway)
    protected readonly subwayRepository: Repository<Subway>,
  ) {
    super(subwayRepository, '城市');
  }
}