import { Get, Param } from '@nestjs/common';
import { TID } from '@xf/common/interfaces/id.interface';
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

  @Get(':id')
  async findById(
    @Param('id') id: TID,
  ): Promise<Partial<E> | Pick<E, Exclude<keyof E, 'createdAt' | 'updatedAt'>> | undefined> {
    const target = await this.service.findById(id);
    if (target) {
      const { createdAt, updatedAt, ...rest } = target;
      return { ...rest };
    }
    return target;
  }
}
