import {
  Controller,
  Put,
  Body,
  Post,
  Get,
  Param,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@/guard/roles.guard';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { CurdController } from '@/common/curd/curd.controller';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from '@/decorators/http.decorator';
import { Roles } from '@/decorators/roles.decorator';

@Controller('user')
export class UserController extends CurdController<UserEntity, UpdateUserDto> {
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
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ) {
    return await this.userService.getUserList(skip, take);
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
    return this.userService.buildUser(user);
  }

  /**
   * 根据用户Id查找信息
   * @param {string} id
   * @returns
   * @memberof UserController
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findOneAndThrowError({ id });
    return this.userService.buildUser(user);
  }

  @Post()
  @Message('注册成功')
  async create(@Body() entity: CreateUserDto) {
    return await this.userService.create(entity);
  }

  @Put()
  @Message('更新成功')
  async update(@Body() entity: UpdateUserDto): Promise<any> {
    return await this.userService.update(entity);
  }
}
