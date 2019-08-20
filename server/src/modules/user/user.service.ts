import { Injectable, BadRequestException, Put, Body } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleEntity } from '../role/role.entity';
import { CurdService } from '@/common/curd/curd.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorCode } from '@/constants/error-code';

export type TKeyStringObj = { [key: string]: any };

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
   * @param {boolean} [onlyExcludePwd=false] 返回时是否只排除 `password` 字段 default `true`
   * @returns
   * @memberof UserService
   */
  buildUser(user: UserEntity, onlyExcludePwd: boolean = false) {
    const { createdAt, updatedAt, ...result } = user;
    if (onlyExcludePwd) {
      delete user.password;
      return user;
    }
    return result;
  }

  /**
   * 查找用户
   * @param {*} query 查找参数
   * @returns {Promise<UserEntity>}
   * @memberof UserService
   */
  async findOne(query: TKeyStringObj): Promise<UserEntity> {
    return await this.userRepository.findOne(query, {
      relations: ['roles'],
    });
  }

  /**
   * 查找用户 不存在时报错
   * @param {TKeyStringObj} query
   * @returns {Promise<UserEntity>}
   * @memberof UserService
   */
  async findOneAndThrowError(query: TKeyStringObj): Promise<UserEntity> {
    const user = this.findOne(query);
    if (user) {
      return user;
    } else {
      const key = Object.keys(query)[0];
      const value = Object.values(query)[0];
      this.handleNotFoundError(value, key);
    }
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

  /**
   * 获取所有的用户
   * @param {number} skip
   * @param {number} take
   * @returns
   * @memberof UserService
   */
  async getUserList(skip: number, take: number) {
    const [users, count] = await this.userRepository.findAndCount({
      skip,
      take,
    });
    const list = users.map(user => this.buildUser(user, true));
    return Promise.resolve({
      list,
      pagination: {
        current: +skip,
        pageSize: +take,
        total: count,
      },
    });
  }
}
