import { Controller, Body, Put } from '@nestjs/common';
import { City } from '@xf/common/src/entities/city.entity';
import { UpdateCityInput } from '@xf/common/src/dtos/city/update-city.input';
import { CurdController } from '@/common/curd/curd.controller';
import { CityService } from './city.service';

@Controller('city')
export class CityController extends CurdController<City, UpdateCityInput> {
  constructor(protected readonly cityService: CityService) {
    super(cityService);
  }

  async create(): Promise<any> {
    // do nothing
  }

  @Put()
  async update(@Body() dto: UpdateCityInput): Promise<void> {
    await this.service.update(dto);
  }
}
