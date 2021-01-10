import { Module } from '@nestjs/common';
import { WxPushService } from './wx-push.service';

@Module({
  providers: [WxPushService],
  exports: [WxPushService],
})
export class WxPushModule {}
