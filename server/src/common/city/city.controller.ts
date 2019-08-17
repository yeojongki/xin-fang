import { BaseController } from '../base/base.controller';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('city')
export class CityController extends BaseController<CityEntity> {
  constructor(protected readonly cityService: CityService) {
    super(cityService);
  }

  @Get(':id/subways')
  async getSubways(@Param('id') cityId: number) {
    return this.cityService.getSubways(+cityId);
  }
}
