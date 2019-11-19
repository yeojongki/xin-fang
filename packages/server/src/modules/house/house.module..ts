import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from '@xf/common/src/entities';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
