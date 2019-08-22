import { Controller, Get, Param } from '@nestjs/common';
import { City } from '@xf/common/entities/city.entity';
import { BaseController } from '../base/base.controller';
import { CityService } from './city.service';

@Controller('city')
export class CityController extends BaseController<City> {
  constructor(protected readonly cityService: CityService) {
    super(cityService);
  }

  @Get(':id/subways')
  async getSubways(@Param('id') cityId: number) {
    return this.cityService.getSubways(+cityId);
  }
}
