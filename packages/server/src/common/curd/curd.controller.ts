import {
  Delete,
  UseGuards,
  Param,
  Body,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IID, TID, TIDs } from '@xf/common/src/interfaces/id.interface';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { CurdService } from './curd.service';
import { Message } from '@/decorators/http.decorator';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { BaseController, IFindIdResult } from '../base/base.controller';
import { TKeyStringObj } from '@xf/common/src/interfaces/common.interface';
import { TListQuery } from '@/interfaces/list.query.interfact';

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

  @Get('list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getList(@Query('query') query: TListQuery<E>): Promise<IPaginationList<E>> {
    return await this.service.getList(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Delete(':id')
  @Message('删除成功')
  async deleteById(@Param('id') id: TID): Promise<void> {
    await this.service.delete(id);
    return Promise.resolve();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Delete()
  @Message('删除成功')
  async deleteByIds(@Body() ids: TIDs): Promise<void> {
    await this.service.deleteByIds(ids);
    return Promise.resolve();
  }
}
