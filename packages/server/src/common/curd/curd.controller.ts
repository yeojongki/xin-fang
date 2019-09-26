import { Delete, UseGuards, Param, Body } from '@nestjs/common';
import { IID, TID, TIDs } from '@xf/common/src/interfaces/id.interface';
import { CurdService } from './curd.service';
import { Message } from '@/decorators/http.decorator';
import { Roles } from '@/decorators/roles.decorator';
import { BaseController, IFindIdResult } from '../base/base.controller';

/**
 * curd controller
 * @class CurdController
 * @template E 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CurdController<E extends IFindIdResult, U extends IID> extends BaseController<
  E
> {
  constructor(protected readonly service: CurdService<E, U>) {
    super(service);
  }

  abstract async create(dto: any): Promise<any>;

  abstract async update(dto: U): Promise<any>;

  @Delete(':id')
  @Message('删除成功')
  async deleteById(@Param('id') id: TID): Promise<void> {
    await this.service.delete(id);
  }

  @Delete()
  @Message('删除成功')
  async deleteByIds(@Body() ids: TIDs): Promise<void> {
    await this.service.deleteByIds(ids);
  }
}
