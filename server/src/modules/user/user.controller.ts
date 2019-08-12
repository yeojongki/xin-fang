import {
  Controller,
  Put,
  Body,
  Post,
  Get,
  Param,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@/guard/roles.guard';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { CommonController } from '@/common/common.controller';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorCode } from '@/constants/error-code';

@Controller('users')
export class UserController extends CommonController<UserEntity> {
  constructor(private readonly UserService: UserService) {
    super(UserService);
  }

  /**
   * 根据 id 查找用户 不存在时会抛出错误
   * @private
   * @param {string} id
   * @returns
   * @memberof UserController
   */
  private async getUserById(id: string) {
    const user = await this.UserService.findOneAndThrowError({ id });
    return this.UserService.buildUser(user);
  }

  /**
   * 获取用户自身信息
   * @param {*} req
   * @returns
   * @memberof UserController
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('self')
  async getProfile(@Request() req) {
    const { id } = req.user;
    return this.getUserById(id);
  }

  /**
   * 根据用户Id查找信息
   * @param {string} id
   * @returns
   * @memberof UserController
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.UserService.findOne(id);
    return this.UserService.buildUser(user);
  }

  @Post()
  async create(@Body() entity: CreateUserDto) {
    const { username } = entity;
    const exist = await this.UserService.findOne({ username });
    if (exist) {
      throw new BadRequestException({
        message: '用户名已存在',
        error: { username },
        errno: errorCode.USER_NAME_EXIST,
      });
    } else {
      const user = await this.UserService.create(entity);
      return this.UserService.buildUser(user);
    }
  }

  @Put()
  async update(@Body() entity: UpdateUserDto): Promise<any> {
    return await this.UserService.update(entity);
  }
}
