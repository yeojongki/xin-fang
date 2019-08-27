import { Controller } from '@nestjs/common';
import { Subway } from '@xf/common/src/entities/subway.entity';
import { BaseController } from '../base/base.controller';
import { SubwayService } from './subway.service';

@Controller('subway')
export class SubwayController extends BaseController<Subway> {
  constructor(protected readonly subwayService: SubwayService) {
    super(subwayService);
  }
}
