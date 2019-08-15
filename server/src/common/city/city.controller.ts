import { BaseController } from '../base/base.controller';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { Controller } from '@nestjs/common';

@Controller('city')
export class CityController extends BaseController<CityEntity> {
  constructor(protected readonly cityService: CityService) {
    super(cityService);
  }
}
