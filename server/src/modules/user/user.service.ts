import { Injectable, BadRequestException, Put, Body } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleEntity } from '../role/role.entity';
import { CurdService } from '@/common/curd/curd.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class UserService extends CurdService<UserEntity, UpdateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {
    super(userRepository, '用户');
  }

  /**
   * 构建用户信息 (除去保密和无需返回的字段)
   * @param {UserEntity} user
   * @returns
   * @memberof UserService
   */
  buildUser(user: UserEntity) {
    const { password, createdAt, updatedAt, ...result } = user;
    return result;
  }

  /**
   * 查找用户
   * @param {*} query 查找参数
   * @returns {Promise<UserEntity>}
   * @memberof UserService
   */
  async findOne(query: any): Promise<UserEntity> {
    return await this.userRepository.findOne(query, { relations: ['roles'] });
  }

  /**
   * 创建用户
   * @param {CreateUserDto} dto
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async create(dto: CreateUserDto): Promise<void> {
    const { username } = dto;
    const isExisted = await this.findOne({ username });
    if (isExisted) {
      throw new BadRequestException({
        message: '用户名已存在',
        error: { username },
        errno: errorCode.USER_NAME_EXIST,
      });
    }

    // 添加默认角色
    if (!dto.roles) {
      const role = await this.rolesRepository.findOne({
        where: { token: 'user' },
      });
      role ? (dto.roles = [role]) : (dto.roles = []);
    }

    const toSave = this.userRepository.create(dto);
    await this.userRepository.save(toSave);
    return Promise.resolve();
  }
}
