import { Controller, Put, Body, Post, Get, Param, Request, UseGuards, Query } from '@nestjs/common';
import { User } from '@xf/common/src/entities/user.entity';
import { UpdateUserInput } from '@xf/common/src/dtos/user/update-user.input';
import { CreateUserInput } from '@xf/common/src/dtos/user/create-user.input';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { DEFAULT_PAGE_SIZE } from '@xf/common/src/constants/pagination.const';
import { UserService } from './user.service';
import { RolesGuard } from '@/guard/roles.guard';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { CurdController } from '@/common/curd/curd.controller';
import { Message } from '@/decorators/http.decorator';
import { Roles } from '@/decorators/roles.decorator';

@Controller('user')
export class UserController extends CurdController<User, UpdateUserInput> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  /**
   * 获取所有的用户
   * @param {number} [skip=0]
   * @param {number} [take=20]
   * @returns
   * @memberof UserController
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Get('list')
  async getUserList(
    @Query('current') skip: number = 0,
    @Query('pageSize') take: number = DEFAULT_PAGE_SIZE,
  ): Promise<IPaginationList> {
    const result = await this.userService.getUserList(skip, take);
    return result;
  }

  /**
   * 获取用户自身信息
   * @param {*} req
   * @returns
   * @memberof UserController
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('currentUser')
  async getProfile(@Request() req) {
    const { id } = req.user;
    const user = await this.userService.findByIdAndThrowError(id);
    return this.userService.buildUser(user as User);
  }

  /**
   * 根据用户Id查找信息
   * @param {string} id
   * @returns
   * @memberof UserController
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findByIdAndThrowError(id);
    return this.userService.buildUser(user as User);
  }

  @Post()
  @Message('注册成功')
  async create(@Body() entity: CreateUserInput): Promise<void> {
    await this.userService.create(entity);
    return Promise.resolve();
  }

  @Put()
  @Message('更新成功')
  async update(@Body() entity: UpdateUserInput): Promise<void> {
    await this.userService.update(entity);
    return Promise.resolve();
  }
}
