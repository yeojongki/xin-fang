import * as dotenv from 'dotenv';
import fs = require('fs-extra');
import { RedisModuleOptions } from 'nestjs-redis';
import { Injectable } from '@nestjs/common';

type ModifyNextValueHandler = (string | number) | ((val: string) => string | number);

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * 修改配置文件
   *
   * @param {string} key 配置文件中的 key 名
   * @param {((val: string) => string | number)} nextValHandler
   * @returns
   * @memberof ConfigService
   */
  async modifyConfig(
    keys: string | string[],
    nextValHandlers: ModifyNextValueHandler | ModifyNextValueHandler[],
  ) {
    let fileStr = await fs.readFile(this.filePath, 'utf-8');

    if (typeof keys === 'string') {
      keys = [keys];
    }

    if (!Array.isArray(nextValHandlers)) {
      nextValHandlers = [nextValHandlers];
    }

    keys.forEach((key, index) => {
      const reg = new RegExp(`(${key}=)\\s*(.*)?\\s`);
      const matched = fileStr.match(reg);

      if (matched && matched[1] && matched[2]) {
        const handler = nextValHandlers[index];
        const nextValue = typeof handler === 'function' ? handler(matched[2]) : handler;
        fileStr = fileStr.replace(`${matched[1]}${matched[2]}`, `${matched[1]}${nextValue}`);
        // 重新写入文件
      }
    });

    return await fs.writeFile(this.filePath, fileStr);
  }

  get IS_PROD(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get API_PREFIX(): string {
    return this.envConfig.API_PREFIX;
  }

  get APP_DOMAIN(): string {
    return this.envConfig.APP_DOMAIN;
  }

  get PM2_PROJECT_NAME(): string {
    return this.envConfig.PM2_PROJECT_NAME;
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

  get PROXY_POOL_COUNT(): number {
    return +this.envConfig.PROXY_POOL_COUNT;
  }

  get SC_KEY(): string {
    return this.envConfig.SC_KEY;
  }

  get SPIDER_CRON_JOB(): string {
    return this.envConfig.SPIDER_CRON_JOB;
  }

  get SPIDER_IS_OPEN_HOUSE(): boolean {
    return +this.envConfig.SPIDER_IS_OPEN_HOUSE === 1;
  }

  get SPIDER_KEYWORD_EXCLUDE(): string[] {
    return this.envConfig.SPIDER_KEYWORD_EXCLUDE
      ? this.envConfig.SPIDER_KEYWORD_EXCLUDE.split(',')
      : [];
  }

  get SPIDER_KEYWORD_INCLUDE(): string[] {
    return this.envConfig.SPIDER_KEYWORD_INCLUDE
      ? this.envConfig.SPIDER_KEYWORD_INCLUDE.split(',')
      : [];
  }

  get SPIDER_KEYWORD_TO_PUSH(): boolean {
    return +this.envConfig.SPIDER_KEYWORD_TO_PUSH === 1;
  }

  get SPIDER_ONLY_FETCH_WITH_KEYWORD(): boolean {
    return +this.envConfig.SPIDER_ONLY_FETCH_WITH_KEYWORD === 1;
  }

  get SPIDER_MAX_FETCH_IN_CRON(): number {
    return +this.envConfig.SPIDER_MAX_FETCH_IN_CRON;
  }

  get SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON(): number {
    return +this.envConfig.SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON;
  }

  get SPIDER_PRE_FETCH_PAGE_COUNT(): number {
    return +this.envConfig.SPIDER_PRE_FETCH_PAGE_COUNT;
  }
}
