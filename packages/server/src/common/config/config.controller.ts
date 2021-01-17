import { Body, Controller, Get, Put } from '@nestjs/common';
import { ISpiderConfig } from '@xf/common/src/interfaces/config.interface';
import { UpdateSpiderConfigInput } from '@xf/common/src/dtos/config/update.spider-config.input';
import {
  VALUE_TYPE_BOOLEAN,
  VALUE_TYPE_NUMBER,
  VALUE_TYPE_STRING,
  VALUE_TYPE_ARRAY_STRING,
} from '@xf/common/src/constants/config.const';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly service: ConfigService) {}

  @Get('spider-config')
  getSpiderConfig(): ISpiderConfig[] {
    return [
      {
        type: VALUE_TYPE_STRING,
        name: 'cron 表达式',
        key: 'SPIDER_CRON_JOB',
        value: this.service.SPIDER_CRON_JOB,
      },
      {
        type: VALUE_TYPE_BOOLEAN,
        name: '开启爬虫',
        key: 'SPIDER_IS_OPEN_HOUSE',
        value: this.service.SPIDER_IS_OPEN_HOUSE,
      },
      {
        type: VALUE_TYPE_ARRAY_STRING,
        name: '爬取排除的关键词',
        extra: '(exlucd 权重大于 include)',
        key: 'SPIDER_KEYWORD_EXCLUDE',
        value: this.service.SPIDER_KEYWORD_EXCLUDE,
      },
      {
        type: VALUE_TYPE_ARRAY_STRING,
        name: '爬取下列关键字时推送',
        key: 'SPIDER_KEYWORD_INCLUDE',
        value: this.service.SPIDER_KEYWORD_INCLUDE,
      },
      {
        type: VALUE_TYPE_BOOLEAN,
        name: '豆瓣爬取时匹配到关键词进行推送',
        key: 'SPIDER_KEYWORD_TO_PUSH',
        value: this.service.SPIDER_KEYWORD_TO_PUSH,
      },
      {
        type: VALUE_TYPE_BOOLEAN,
        name: '只爬取有关键词的房源',
        key: 'SPIDER_ONLY_FETCH_WITH_KEYWORD',
        value: this.service.SPIDER_ONLY_FETCH_WITH_KEYWORD,
      },
      {
        type: VALUE_TYPE_NUMBER,
        name: 'cron job 时间内最大请求数',
        key: 'SPIDER_MAX_FETCH_IN_CRON',
        value: this.service.SPIDER_MAX_FETCH_IN_CRON,
      },
      {
        type: VALUE_TYPE_NUMBER,
        name: 'cron job 时间内最大请求错误数',
        key: 'SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON',
        value: this.service.SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON,
      },
      {
        type: VALUE_TYPE_NUMBER,
        name: '每次预爬取的列表页数',
        key: 'SPIDER_PRE_FETCH_PAGE_COUNT',
        value: this.service.SPIDER_PRE_FETCH_PAGE_COUNT,
      },
    ];
  }

  @Put('spider-config')
  async updateSpiderConfig(@Body() config: UpdateSpiderConfigInput) {
    const keys: string[] = Object.keys(config);
    const nextValHandler: string | number[] = keys.map((key) => {
      return config[key];
    });

    return await this.service.modifyConfig(keys, nextValHandler);
  }
}
