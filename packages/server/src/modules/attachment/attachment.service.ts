import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IOSSSignature, IOSSCallback } from '@xf/common/src/interfaces/oss-signature.interface';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { ConfigService } from '@/common/config/config.service';

@Injectable()
export class AttachmentService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * OSS 签名
   * @param {IUser['id']} userId
   * @returns {Promise<IOSSSignature>}
   * @memberof AttachmentService
   * @see https://help.aliyun.com/document_detail/31927.html?spm=a2c4g.11186623.6.1397.59db23f0t8U6qQ
   */
  async getSignature(userId: IUser['id']): Promise<IOSSSignature> {
    const {
      OSS_POLICY_EXPIRED,
      ATTACHMENT_LIMIT_MB,
      OSS_ACCESS_KEY_SECRET,
      OSS_ACCESS_KEY_ID,
      OSS_HOST,
      OSS_CALLBACK_URL,
    } = this.configService;

    const dir = `${crypto
      .createHash('md5')
      .update(userId)
      .digest('hex')}/`;

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

  handleOSSCallback(callback: IOSSCallback) {
    return callback;
  }
}
