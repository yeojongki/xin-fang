import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, City, Subway } from '@xf/common/src/entities';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { CityService } from '../city/city.service';
import { SubwayService } from '../subway/subway.service';

@Module({
  imports: [TypeOrmModule.forFeature([House, City, Subway])],
  controllers: [HouseController],
  providers: [HouseService, CityService, SubwayService],
})
export class HouseModule {}
