import { Controller, Post, Body, Put, Req } from '@nestjs/common';
import { House } from '@xf/common/src/entities';
import { UpdateHouseInput } from '@xf/common/src/dtos/house/update-house.input';
import { CreateHouseInput } from '@xf/common/src/dtos/house/create-house.input';
import { CurdController } from '@/common/curd/curd.controller';
import { IAuthRequest } from '@/guard/permission-auth.guard';
import { HouseService } from './house.service';

@Controller('house')
export class HouseController extends CurdController<House, UpdateHouseInput> {
  constructor(protected readonly service: HouseService) {
    super(service);
  }

  @Post()
  async create(@Body() dto: CreateHouseInput, @Req() req: IAuthRequest): Promise<void> {
    const { user } = req;
    await this.service.create(dto, user);
  }

  @Put()
  async update(@Body() dto: UpdateHouseInput, @Req() req: IAuthRequest): Promise<void> {
    const { user } = req;
    await this.service.update(dto, user);
  }
}
