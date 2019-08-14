import {
  Controller,
  Put,
  Body,
  Post,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '@/guard/roles.guard';
import { JwtAuthGuard } from '@/guard/auth.guard';
import { CommonController } from '@/common/common.controller';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from '@/decorators/http.decorator';

@Controller('user')
export class UserController extends CommonController<
  UserEntity,
  UpdateUserDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
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
    return await this.userService.findByIdAndThrowError(id);
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
    return this.userService.buildUser(user);
  }

  @Post()
  @Message('注册成功')
  async create(@Body() entity: CreateUserDto) {
    return await this.userService.create(entity);
  }

  @Put()
  async update(@Body() entity: UpdateUserDto): Promise<any> {
    return await this.userService.update(entity);
  }
}
