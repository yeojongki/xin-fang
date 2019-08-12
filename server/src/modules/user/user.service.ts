import { Injectable, BadRequestException, Put, Body } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleEntity } from '../role/role.entity';
import { CommonService } from '@/common/common.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class UserService extends CommonService<UserEntity, UpdateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {
    super(userRepository, '用户不存在');
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
   * @returns {Promise<UserEntity>}
   * @memberof UserService
   */
  async create(dto: CreateUserDto): Promise<UserEntity> {
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
        where: { token: 'default' },
      });
      role ? (dto.roles = [role]) : (dto.roles = []);
    }

    const toSave = this.userRepository.create(dto);
    return await this.userRepository.save(toSave);
  }
}
