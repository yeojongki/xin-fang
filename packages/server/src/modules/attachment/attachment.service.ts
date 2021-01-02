import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as FormData from 'form-data';
import { IOSSSignature, IOSSCallback } from '@xf/common/src/interfaces/oss-signature.interface';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { HttpSuccessResponse } from '@xf/common/src/interfaces/http.interface';
import { ConfigService } from '@/common/config/config.service';
import { request } from '@/utils';

@Injectable()
export class AttachmentService {
  private readonly logger = new Logger(AttachmentService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * OSS 签名
   * @param {IUser['id']} userId
   * @returns {Promise<IOSSSignature>}
   * @memberof AttachmentService
   * @see https://help.aliyun.com/document_detail/31927.html?spm=a2c4g.11186623.6.1397.59db23f0t8U6qQ
   */
  public async getSignature(userId: IUser['id']): Promise<IOSSSignature> {
    const {
      OSS_POLICY_EXPIRED,
      ATTACHMENT_LIMIT_MB,
      OSS_ACCESS_KEY_SECRET,
      OSS_ACCESS_KEY_ID,
      OSS_HOST,
      OSS_CALLBACK_URL,
    } = this.configService;

    const dir = `${crypto.createHash('md5').update(userId).digest('hex')}/`;

    const expiration = new Date(Date.now() + 1000 * +OSS_POLICY_EXPIRED).toISOString();

    const policyJSON = {
      expiration,
      conditions: [
        ['content-length-range', 0, ATTACHMENT_LIMIT_MB * 1024 * 1024],
        ['starts-with', '$key', dir],
      ],
    };

    const policyBase64 = Buffer.from(JSON.stringify(policyJSON)).toString('base64');

    const signature = crypto
      .createHmac('sha1', OSS_ACCESS_KEY_SECRET)
      .update(policyBase64)
      .digest('base64');

    const callbackBody = `{
        "filename":\${object},
        "size":\${size},
        "width":\${imageInfo.width},
        "height":\${imageInfo.height},
        "format":\${imageInfo.format},
        "mimeType":\${mimeType}
      }`.replace(/[\s \r \n]/gm, '');

    const callbackJSON = JSON.stringify({
      callbackHost: 'oss-xf.aliyuncs.com',
      callbackUrl: OSS_CALLBACK_URL,
      callbackBody,
      callbackBodyType: 'application/json',
    });
    const callback = Buffer.from(callbackJSON).toString('base64');

    const result: IOSSSignature = {
      policy: policyBase64,
      OSSAccessKeyId: OSS_ACCESS_KEY_ID,
      signature,
      expiration,
      host: OSS_HOST,
      dir,
      callback,
    };

    return result;
  }

  public handleOSSCallback(callback: IOSSCallback) {
    return callback;
  }

  /**
   * 上传网络图片到 OSS
   *
   * @param {string | string[]} imgs
   * @param {string} userId
   * @param {string} userDir 用户下的类别 house / avatar 等
   * @param {string} fileExt 文件后缀 jpg png 等
   * @returns {Promise<string>}
   * @memberof HouseSpiderService
   */
  public async uploadImgs2OSS(
    imgs: string | string[],
    userId: string,
    userDir: string,
  ): Promise<string[]> {
    if (typeof imgs === 'string') {
      imgs = [imgs];
    }
    if (imgs.length) {
      const OSSData: IOSSSignature = await this.getSignature(userId);
      const urls = await Promise.all(
        imgs.map((url) => this.handleUploadImg(url, userDir, OSSData)),
      );

      return urls.filter(Boolean);
    } else {
      return [];
    }
  }

  /**
   * 上传文件
   *
   * @private
   * @param {string} url 网络文件地址
   * @param {string} userDir 用户下的类别 house / avatar 等
   * @param {IOSSSignature} ossData
   * @returns
   * @memberof HouseSpiderService
   */
  private async handleUploadImg(url: string, userDir: string, ossData: IOSSSignature) {
    try {
      const { policy, OSSAccessKeyId, signature, host, dir, callback } = ossData;

      const data = await request.get(url, {
        responseType: 'stream',
      });

      const formData = new FormData();
      // dir 为此人的文件夹, house 为类别的 dir 如 house avatar
      const key = `${dir}${userDir}/${+new Date()}`;
      formData.append('key', key);
      formData.append('OSSAccessKeyId', OSSAccessKeyId);
      formData.append('policy', policy);
      formData.append('signature', signature);
      formData.append('success_action_status', '200');
      formData.append('callback', callback);
      formData.append('file', data);

      const formHeaders = formData.getHeaders();

      const {
        result: { filename },
      } = await request.post<any, HttpSuccessResponse<{ filename: string }>>(host, formData, {
        headers: { ...formHeaders },
      });

      return filename;
    } catch (error) {
      this.logger.error(`上传图片出错, url: ${url}, error: ${error.message}`);
      // 出错返回 ''
      return '';
    }
  }
}
