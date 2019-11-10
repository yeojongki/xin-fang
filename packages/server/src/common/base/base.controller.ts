import { Get, Param, Query } from '@nestjs/common';
import { TID } from '@xf/common/src/interfaces/id.interface';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { ParseListQuery } from '@/pipes/parse-list-query.pipe';
import { BaseService } from './base.service';

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

  @Get('list')
  async getList(@Query(ParseListQuery) query: TListQuery<E>): Promise<IPaginationList<E>> {
    return await this.service.getList(query);
  }

  @Get(':id')
  async findById(@Param('id') id: TID): Promise<Partial<E> | undefined> {
    return await this.service.findById(id);
  }
}
