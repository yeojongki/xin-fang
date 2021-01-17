import { IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateSpiderConfigInput {
  @IsOptional()
  SPIDER_CRON_JOB?: string;

  @IsOptional()
  @Transform((v) => (v ? 1 : 0))
  SPIDER_IS_OPEN_HOUSE?: boolean;

  @IsOptional()
  @IsArray()
  @Transform((v) => v.join(','), { toPlainOnly: true })
  SPIDER_KEYWORD_EXCLUDE?: string[];

  @IsOptional()
  @IsArray()
  @Transform((v) => v.join(','), { toPlainOnly: true })
  SPIDER_KEYWORD_INCLUDE?: string[];

  @IsOptional()
  @Transform((v) => (v ? 1 : 0))
  SPIDER_KEYWORD_TO_PUSH?: boolean;

  @IsOptional()
  @Transform((v) => (v ? 1 : 0))
  SPIDER_ONLY_FETCH_WITH_KEYWORD?: boolean;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  SPIDER_MAX_FETCH_IN_CRON?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  SPIDER_MAX_FETCH_ERROR_COUNT_IN_CRON?: number;

  @IsOptional()
  @Transform((v) => parseInt(v, 10))
  SPIDER_PRE_FETCH_PAGE_COUNT?: number;
}
