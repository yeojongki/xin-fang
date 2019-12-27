import { Injectable, BadRequestException } from '@nestjs/common';
import Axios from 'axios';
import * as crypto from 'crypto';
import { ISendEmailOptions } from '@xf/common/src/interfaces/email.interface';
import { RedisService } from 'nestjs-redis';
import { isProd, getRandom } from '@xf/common/src/utils';
import { decode, encode } from '@/utils/encode-decode';
import { ConfigService } from '../config/config.service';
import { UserService } from '@/modules/user/user.service';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class EmailService {
  static getSendEmailKey = (id: string) => `SEND_EMAIL_${id}`;

  static getVerifyCodeKey = (id: string) => `VERIFY_CODE_${id}`;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  get redisClient() {
    return this.redisService.getClient();
  }

  /**
   * 更新用户邮箱
   *
   * @private
   * @param {string} id
   * @param {string} email
   * @returns {Promise<void>}
   * @memberof EmailService
   */
  private async updateUserEmail(id: string, email: string): Promise<void> {
    const user = await this.userService.findOne({ id });
    if (user) {
      user.email = email;
      user.emailVerified = 1;
      await this.userService.save(user);
      // 删除验证码
      this.redisClient.del(EmailService.getVerifyCodeKey(id));
    } else {
      throw new BadRequestException({
        errno: errorCode.EMAIL_USER_INVALID,
        message: '用户信息不合法，请检查链接是否有误或者重新验证',
      });
    }
  }

  /**
   * 检测链接或验证码是否失效
   *
   * @private
   * @param {string} id
   * @param {('link' | 'code')} type
   * @returns
   * @memberof EmailService
   */
  private async checkLinkOrCodeExpired(id: string, type: 'link' | 'code') {
    const isValid = await this.redisClient.get(EmailService.getVerifyCodeKey(id));
    if (!isValid) {
      throw new BadRequestException({
        errno: errorCode.EMAIL_INVALID,
        message: `${
          type === 'code' ? '验证码' : '链接'
        }不存在或者已过期，请检查链接是否有误或者重新验证`,
      });
    }
    return isValid;
  }

  /**
   * 通过链接更新用户邮箱
   *
   * @param {string} id
   * @param {string} encodeEmail
   * @returns
   * @memberof EmailService
   */
  async verifyByLink(id: string, encodeEmail: string) {
    const email = decode(encodeEmail);
    await this.checkLinkOrCodeExpired(id, 'link');
    return this.updateUserEmail(id, email);
  }

  /**
   * 通过验证码更新用户邮箱
   *
   * @param {string} id
   * @param {string} email
   * @param {string} code
   * @returns
   * @memberof EmailService
   */
  async verifyByCode(id: string, email: string, code: string) {
    const codeInRedis = await this.checkLinkOrCodeExpired(id, 'code');
    if (codeInRedis === code) {
      return this.updateUserEmail(id, email);
    }
    throw new BadRequestException({
      errno: errorCode.EMAIL_CODE_INVALID,
      message: '验证码错误，请检查是否有误或者重新验证',
    });
  }

  /**
   * 发送验证邮件
   *
   * @param {string} id
   * @param {string} username
   * @param {string} email
   * @memberof EmailService
   */
  async sendVerifyEmail(id: string, username: string, email: string) {
    const user = await this.userService.findOneAndThrowError({ id });
    if (user.email === email) {
      throw new BadRequestException({
        errno: errorCode.EMAIL_IS_SAME,
        message: '不能输入相同的邮箱',
      });
    }

    const sended = await this.redisClient.get(EmailService.getSendEmailKey(id));
    if (sended) {
      throw new BadRequestException({
        errno: errorCode.REQURES_TOO_FAST,
        message: '发送邮件频率太快',
      });
    }

    const url = `${this.configService.APP_DOMAIN}user/verify-email?id=${id}&email=${encode(email)}`;
    const verifyCode = getRandom(1001, 9999);

    await this.singleSendEmail(id, {
      FromAlias: '馨房',
      Subject: '馨房 - 激活邮箱',
      /* eslint-disable eslint-comments/disable-enable-pair */
      /* eslint-disable no-useless-escape */
      HtmlBody: `<html>
        <div><span style=\"font-weight:bold\">Hi~${username}：</span></div>
        <br>
        <div>您的邮箱验证码为：<span style=\"font-weight:bold\">${verifyCode}</span></div>
        <div><a href=\"${url}\">或者点击此处即可激活/修改您的邮箱</a></div>
        <br>
        <div>邮箱验证时长为${this.configService.EMAIL_CODE_VALID_TIME}分钟，请尽快验证</div>
        <br>
        <div>${url}</div>
        <br>
        <div>如无法点击，请将上方链接拷贝到浏览器地址栏</div>
        <div>如果你有任何疑问，可以回复这封邮件向我们提问</div>
        <br>
        <div>「馨房」团队</div>
      </html>`,
      ToAddress: isProd ? email : this.configService.EMAIL_DEV_TO_ADDR,
    });

    await this.redisClient
      .pipeline()
      // 邮箱验证码倒计时
      .set(EmailService.getSendEmailKey(id), 1, 'EX', this.configService.EMAIL_SEND_INTERVAL)
      // 邮箱验证码
      .set(
        EmailService.getVerifyCodeKey(id),
        verifyCode,
        'EX',
        this.configService.EMAIL_CODE_VALID_TIME * 60,
      )
      .exec();
  }

  /**
   * 阿里云邮件推送
   * @see https://help.aliyun.com/document_detail/29434.html
   * @param {string} id 发送目标 id
   * @param {Partial<ISendEmailOptions>} options
   * @returns
   * @memberof EmailService
   */
  singleSendEmail(id: string, options: Partial<ISendEmailOptions>) {
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
        data.push(`${key}=${encodeURIComponent(params[key])}`);
      });

      Axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: 'https://dm.aliyuncs.com',
        method: 'POST',
        data: data.join('&'),
      })
        .then(res => {
          resolve(res.data);
          this.redisClient.set(
            EmailService.getSendEmailKey(id),
            1,
            'EX',
            this.configService.EMAIL_SEND_INTERVAL,
          );
        })
        .catch(reject);
    });
  }
}
