import { CommonService } from './common.service';
import { Message } from '@/decorators/http.decorator';
import { Body, Post, Put, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { RolesGuard } from '@/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';

export class CommonController<T> {
  constructor(private readonly service: CommonService<T>) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    return this.service.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Delete()
  @Message('删除成功')
  async delete(@Body() id: string): Promise<void> {
    await this.service.delete(id);
    return Promise.resolve();
  }
}
