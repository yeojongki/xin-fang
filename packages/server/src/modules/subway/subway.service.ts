import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subway } from '@xf/common/src/entities/subway.entity';
import { BaseService } from '@/common/base/base.service';

@Injectable()
export class SubwayService extends BaseService<Subway> {
  constructor(
    @InjectRepository(Subway)
    protected readonly subwayRepository: Repository<Subway>,
  ) {
    super(subwayRepository, '地铁');
  }

  public findByName(name: string) {
    return this.subwayRepository.findOne({ where: { name } });
  }
}
