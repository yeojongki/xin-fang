import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { RedisModuleOptions } from 'nestjs-redis';
import { Injectable } from '@nestjs/common';
@Injectable()
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

  get EMAIL_SEND_INTERVAL(): number {
    return +this.envConfig.EMAIL_SEND_INTERVAL;
  }

  get EMAIL_CODE_VALID_TIME(): number {
    return +this.envConfig.EMAIL_CODE_VALID_TIME;
  }

  get REDIS_KEY_PREFIX(): string {
    return this.envConfig.REDIS_KEY_PREFIX;
  }

  get REDIS_OPTIONS(): RedisModuleOptions {
    return {
      name: this.REDIS_NAME,
      connectionName: this.REDIS_NAME,
      port: this.REDIS_PORT,
      host: this.REDIS_HOST,
      password: this.REDIS_PASSWORD,
    };
  }

  get DB_HOST() {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT() {
    return Number(this.envConfig.DB_PORT);
  }

  get DB_CHARSET() {
    return this.envConfig.DB_CHARSET;
  }

  get DB_USERNAME() {
    return this.envConfig.DB_USERNAME;
  }

  get DB_PASSWORD() {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_NAME() {
    return this.envConfig.DB_NAME;
  }

  get REDIS_NAME(): string {
    return this.envConfig.REDIS_NAME;
  }

  get REDIS_PASSWORD(): string {
    return this.envConfig.REDIS_PASSWORD;
  }

  get REDIS_HOST(): string {
    return this.envConfig.REDIS_HOST;
  }

  get REDIS_PORT(): number {
    return +this.envConfig.REDIS_PORT;
  }
}
