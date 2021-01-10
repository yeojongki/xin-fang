import { request } from '@/utils';
import { Injectable } from '@nestjs/common';
import qs = require('querystring');
import dayjs = require('dayjs');
import { ConfigService } from '../config/config.service';

@Injectable()
export class WxPushService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * server 酱微信推送 同样内容的消息一分钟只能发送一次
   *
   * @param {(string | number)} title 消息标题，最长为256
   * @param {(string | number)} [content] 消息内容，最长64Kb，可空，支持MarkDown
   * @returns
   * @memberof WxPushService
   */
  public send(title: string | number, content?: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: `https://sc.ftqq.com/${this.configService.SC_KEY}.send`,
        data: qs.stringify({
          text: `${title} - ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`,
          desp: content,
        }),
      }).then((res: any) => {
        if (res.errno === 0) {
          resolve();
        } else {
          reject({ errorCode: res.error_code, message: res.error_message });
        }
      });
    });
  }
}
