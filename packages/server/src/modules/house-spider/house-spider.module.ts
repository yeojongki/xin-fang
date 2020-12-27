import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, User } from '@xf/common/src/entities';
import { HouseSpiderService } from './house-spider.service';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [TypeOrmModule.forFeature([User, House]), ScheduleModule.forRoot()],
  providers: [HouseSpiderService],
  exports: [HouseSpiderService],
})
export class HouseSpiderModule {}
