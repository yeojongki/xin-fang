import { BaseService } from './base.service';
import { Get, Param } from '@nestjs/common';

export type TID = string | number;

export interface IFindIdResult {
  createdAt?: Date;
  updatedAt?: Date;
  id: TID;
  [key: string]: any;
}

/**
 * 只有查找功能
 * @class BaseController
 * @template E 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class BaseController<E extends IFindIdResult> {
  constructor(protected readonly service: BaseService<E>) {}

  @Get(':id')
  async findById(@Param('id') id: TID): Promise<any> {
    const { createdAt, updatedAt, ...rest } = await this.service.findById(id);
    return { ...rest };
  }
}
