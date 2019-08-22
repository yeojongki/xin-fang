import { Delete, UseGuards, Param } from '@nestjs/common';
import { CurdService } from './curd.service';
import { Message } from '@/decorators/http.decorator';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { BaseController, IFindIdResult } from '../base/base.controller';

export interface IID {
  id: string;
}

/**
 * curd controller
 * @class CurdController
 * @template E 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CurdController<
  E extends IFindIdResult,
  U extends IID
> extends BaseController<E> {
  constructor(protected readonly service: CurdService<E, U>) {
    super(service);
  }

  abstract async create(dto: any): Promise<any>;

  abstract async update(dto: U): Promise<any>;

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Delete(':id')
  @Message('删除成功')
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
    return Promise.resolve();
  }
}
