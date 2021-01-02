import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, User } from '@xf/common/src/entities';
import { HouseSpiderService } from './house-spider.service';
import { ScheduleModule } from '@nestjs/schedule';
// import { AttachmentModule } from '../attachment/attachment.module';
import { AttachmentService } from '../attachment/attachment.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, House]), ScheduleModule.forRoot()],
  providers: [HouseSpiderService, AttachmentService],
  exports: [HouseSpiderService],
})
export class HouseSpiderModule {}
