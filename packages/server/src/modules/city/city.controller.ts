import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { City } from '@xf/common/src/entities/city.entity';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { UpdateCityInput } from '@xf/common/src/dtos/city/update-city.input';
import { CurdController } from '@/common/curd/curd.controller';
import { CityService } from './city.service';
import { ParseListQuery } from '@/pipes/parse-list-query.pipe';

@Controller('city')
export class CityController extends CurdController<City, UpdateCityInput> {
  constructor(protected readonly cityService: CityService) {
    super(cityService);
  }

  async create(): Promise<any> {}

  @Get('list')
  async getList(@Query(ParseListQuery) query: TListQuery<City>): Promise<IPaginationList<City>> {
    return await this.service.getList(query);
  }

  @Get(':id/subways')
  async getSubways(@Param('id') cityId: number) {
    return this.cityService.getSubways(+cityId);
  }

  @Put()
  async update(@Body() dto: UpdateCityInput): Promise<void> {
    await this.service.update(dto);
  }
}
