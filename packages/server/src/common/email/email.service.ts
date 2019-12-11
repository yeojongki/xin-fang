import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as crypto from 'crypto';
import { ISendEmailOptions } from '@xf/common/src/interfaces/email.interface';
import { decode, encode } from '@/utils/encode-decode';
import { ConfigService } from '../config/config.service';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async verify(id, encodeEmail: string) {
    const email = decode(encodeEmail);
    const user = await this.userService.findById(id);
    if (user && user.email === email && user.emailVerified === 0) {
      user.emailVerified = 1;
      return await this.userService.save(user);
    }
    return Promise.reject(new Error('验证失败,用户信息不匹配'));
  }

  genarateVerifyCode(id: string, username: string, email: string) {
    const url = `${this.configService.APP_DOMAIN}user/verify-email?id=${id}&email=${encode(email)}`;
    const line1 = `<div><span style="font-weight:bold">Hi~${username}</span></div>`;
    const line2 = `<div>欢迎注册馨房, <a href="${url}">您只需点击此处即可激活您的邮箱</a></div><br>`;
    const line3 = `<div>${url}</div><br>`;
    const line4 = '<div>如无法点击，请将上方链接拷贝到浏览器地址栏</div>';
    const line5 = '<div>如果你有任何疑问，可以回复这封邮件向我们提问</div><br>';
    const line6 = '<div>「馨房」团队</div>';
    // const line6 = `<div><a href="${this.configService.APP_DOMAIN}">馨房</a></div>`;
    return this.singleSendEmail({
      FromAlias: '馨房',
      Subject: '馨房 - 激活邮箱',
      HtmlBody: `<html>${line1}${line2}${line3}${line4}${line5}${line6}</html>`,
      ToAddress: process.env.NODE_ENV === 'production' ? email : this.configService.EMAIL_DEV_ADDR,
    });
  }

  /**
   * 阿里云邮件推送
   * @see https://help.aliyun.com/document_detail/29434.html
   * @memberof EmailService
   */
  singleSendEmail(options: Partial<ISendEmailOptions>) {
    return new Promise((resolve, reject) => {
      const defaultOptions: Partial<ISendEmailOptions> = {
        Format: 'JSON',
        RegionId: 'cn-hangzhou',
        Version: '2015-11-23',
        SignatureMethod: 'HMAC-SHA1',
        Timestamp: new Date().toISOString(),
        SignatureVersion: '1.0',
        SignatureNonce: `${+new Date()}`,
        ReplyToAddress: true,
        AccountName: this.configService.EMAIL_ACCOUNT_NAME,
        AddressType: this.configService.EMAIL_ADDRESS_TYPE,
        AccessKeyId: this.configService.EMAIL_ACCESS_KEY_ID,
        Action: 'SingleSendMail',
      };

      const params = { ...defaultOptions, ...options };
      const paramsArray = Object.keys(params)
        .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`)
        .sort();

      const stringToSign = `POST&%2F&${encodeURIComponent(paramsArray.join('&'))}`;

      const signature = crypto
        .createHmac('sha1', `${this.configService.EMAIL_ACCESS_KEY_SECRET}&`)
        .update(stringToSign)
        .digest('base64');

      const data = [`Signature=${signature}`];
      Object.keys(params).forEach(key => {
        data.push(`${key}=${params[key]}`);
      });

      Axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: 'https://dm.aliyuncs.com',
        method: 'POST',
        data: data.join('&'),
      })
        .then(res => resolve(res.data))
        .catch(reject);
    });
  }
}
