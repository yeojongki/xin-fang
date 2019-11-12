import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import axios from 'axios';
import * as crypto from 'crypto';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';
import { ConfigService } from '@/common/config/config.service';

@Injectable()
export class AttachmentService {
  constructor(private readonly configService: ConfigService) {}

  async getSignature(): Promise<IOSSSignature> {
    const {
      OSS_POLICY_EXPIRED,
      ATTACHMENT_LIMIT_MB,
      OSS_ACCESS_KEY_SECRET,
      OSS_ACCESS_KEY_ID,
      OSS_HOST,
    } = this.configService;

    const expiration = new Date(Date.now() + 1000 * +OSS_POLICY_EXPIRED).toISOString();

    const policyJSON = {
      expiration,
      conditions: [['content-length-range', 0, ATTACHMENT_LIMIT_MB * 1024 * 1024]],
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
      dir: '',
    };

    return result;
  }
}
