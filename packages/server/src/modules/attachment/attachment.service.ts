import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import axios from 'axios';
import * as crypto from 'crypto';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';
import { ConfigService } from '@/common/config/config.service';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';

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
        ['start-with', '$key', dir],
      ],
    };

    const policyBase64 = Buffer.from(JSON.stringify(policyJSON)).toString('base64');

    const signature = crypto
      .createHmac('sha1', OSS_ACCESS_KEY_SECRET)
      .update(policyBase64)
      .digest('base64');

    const result: IOSSSignature = {
      policy: policyBase64,
      OSSAccessKeyId: OSS_ACCESS_KEY_ID,
      signature,
      expiration,
      host: OSS_HOST,
      dir,
    };

    return result;
  }
}
