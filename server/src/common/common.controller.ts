import { CommonService } from './common.service';
import { Message } from '@/decorators/http.decorator';
import { Body, Post, Put, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';

export interface IID {
  id: string;
}

export interface IUpdateDto extends IID {}

/**
 * 公用 controller
 * @class CommonController
 * @template E 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CommonController<E, U extends IUpdateDto> {
  constructor(private readonly service: CommonService<E, U>) {}

  abstract create(dto: any);

  abstract update(dto: U);

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    return await this.service.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Delete()
  @Message('删除成功')
  async deleteById(@Body() id: string): Promise<void> {
    await this.service.delete(id);
    return Promise.resolve();
  }
}
