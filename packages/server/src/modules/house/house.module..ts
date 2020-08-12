import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, City } from '@xf/common/src/entities';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { CityService } from '../city/city.service';

@Module({
  imports: [TypeOrmModule.forFeature([House, City])],
  controllers: [HouseController],
  providers: [HouseService, CityService],
})
export class HouseModule {}
