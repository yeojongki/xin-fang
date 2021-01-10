import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House, User } from '@xf/common/src/entities';
import { HouseSpiderService } from './house-spider.service';
import { ScheduleModule } from '@nestjs/schedule';
// import { ProxyService } from '@/common/proxy/proxy.service';
import { AttachmentService } from '../attachment/attachment.service';
import { WxPushService } from '@/common/wx-push/wx-push.service';
import { SystemService } from '@/common/system/system.service';
import { HouseSpiderController } from './house-spider.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User, House]), ScheduleModule.forRoot()],
  controllers: [HouseSpiderController],
  providers: [HouseSpiderService, AttachmentService, WxPushService, SystemService],
  // providers: [HouseSpiderService, AttachmentService, ProxyService],
  exports: [HouseSpiderService],
})
export class HouseSpiderModule {}
