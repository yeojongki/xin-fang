import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { House } from '@xf/common/src/entities';
import { UpdateHouseInput } from '@xf/common/src/dtos/house/update-house.input';
import { CreateHouseInput } from '@xf/common/src/dtos/house/create-house.input';
import { CurdController } from '@/common/curd/curd.controller';
import { HouseService } from './house.service';

@Controller('house')
export class HouseController extends CurdController<House, UpdateHouseInput> {
  constructor(protected readonly houseService: HouseService) {
    super(houseService);
  }

  @Post()
  async create(@Body() dto: CreateHouseInput): Promise<void> {
    await this.service.create(dto);
  }

  @Put()
  async update(@Body() dto: UpdateHouseInput): Promise<void> {
    await this.service.update(dto);
  }
}
