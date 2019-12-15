import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get API_PREFIX(): string {
    return this.envConfig.API_PREFIX;
  }

  get APP_DOMAIN(): string {
    return this.envConfig.APP_DOMAIN;
  }

  get ATTACHMENT_LIMIT_MB(): number {
    return Number(this.envConfig.ATTACHMENT_LIMIT_MB);
  }

  get OSS_HOST(): string {
    return this.envConfig.OSS_HOST;
  }

  get OSS_CALLBACK_URL(): string {
    return this.envConfig.OSS_CALLBACK_URL;
  }

  get OSS_ACCESS_KEY_ID(): string {
    return this.envConfig.OSS_ACCESS_KEY_ID;
  }

  get OSS_ACCESS_KEY_SECRET(): string {
    return this.envConfig.OSS_ACCESS_KEY_SECRET;
  }

  get OSS_POLICY_EXPIRED(): string {
    return this.envConfig.OSS_POLICY_EXPIRED;
  }

  get EMAIL_ACCOUNT_NAME(): string {
    return this.envConfig.EMAIL_ACCOUNT_NAME;
  }

  get EMAIL_ADDRESS_TYPE(): number {
    return Number(this.envConfig.EMAIL_ADDRESS_TYPE);
  }

  get EMAIL_REPLY_TO_ADDR(): string {
    return this.envConfig.EMAIL_REPLY_TO_ADDR;
  }

  get EMAIL_ACCESS_KEY_ID(): string {
    return this.envConfig.EMAIL_ACCESS_KEY_ID;
  }

  get EMAIL_ACCESS_KEY_SECRET(): string {
    return this.envConfig.EMAIL_ACCESS_KEY_SECRET;
  }

  get EMAIL_DEV_TO_ADDR(): string {
    return this.envConfig.EMAIL_DEV_TO_ADDR;
  }
}
