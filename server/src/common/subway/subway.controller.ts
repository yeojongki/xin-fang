import { BaseController } from '../base/base.controller';
import { Controller } from '@nestjs/common';
import { SubwayEntity } from './subway.entity';
import { SubwayService } from './subway.service';

@Controller('subway')
export class SubwayController extends BaseController<SubwayEntity> {
  constructor(protected readonly subwayService: SubwayService) {
    super(subwayService);
  }
}
