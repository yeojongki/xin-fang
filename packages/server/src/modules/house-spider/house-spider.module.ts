import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, User } from '@xf/common/src/entities';
import { HouseSpiderService } from './house-spider.service';
import { ScheduleModule } from '@nestjs/schedule';
// import { ProxyService } from '@/common/proxy/proxy.service';
import { AttachmentService } from '../attachment/attachment.service';
import { WxPushService } from '@/common/wx-push/wx-push.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, House]), ScheduleModule.forRoot()],
  providers: [HouseSpiderService, AttachmentService, WxPushService],
  // providers: [HouseSpiderService, AttachmentService, ProxyService],
  exports: [HouseSpiderService],
})
export class HouseSpiderModule {}
