import { Controller, Put, Body, Post, Get, Param, Request, Query } from '@nestjs/common';
import { User } from '@xf/common/src/entities/user.entity';
import { UpdateUserInput } from '@xf/common/src/dtos/user/update-user.input';
import { CreateUserInput } from '@xf/common/src/dtos/user/create-user.input';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { UserService } from './user.service';
import { CurdController } from '@/common/curd/curd.controller';
import { Message } from '@/decorators/http.decorator';
import { ParseListQuery } from '@/pipes/parse-list-query.pipe';

@Controller('user')
export class UserController extends CurdController<User, UpdateUserInput> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  /**
   * 获取用户列表
   * @param {TListQuery<User>} query
   * @returns {Promise<IPaginationList<IUser>>}
   * @memberof UserController
   */
  @Get('list')
  async getList(@Query(ParseListQuery) query: TListQuery<User>): Promise<IPaginationList<IUser>> {
    return this.userService.getList(query, ['roles']);
  }

  /**
   * 获取用户自身信息
   * @param {*} req
   * @returns
   * @memberof UserController
   */
  @Get('currentUser')
  async getProfile(@Request() req) {
    const { id } = req.user;
    return await this.userService.findOneAndThrowError({ id });
  }

  /**
   * 根据用户Id查找信息
   * @param {string} id
   * @returns
   * @memberof UserController
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findByIdAndThrowError(id);
  }

  @Post()
  @Message('注册成功')
  async create(@Body() entity: CreateUserInput): Promise<void> {
    await this.userService.create(entity);
  }

  @Put()
  @Message('更新成功')
  async update(@Body() entity: UpdateUserInput): Promise<void> {
    await this.userService.update(entity);
  }
}
