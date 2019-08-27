import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@xf/common/src/entities/user.entity';
import { Role } from '@xf/common/src/entities/role.entity';
import { IKeyStringObj } from '@xf/common/src/interfaces/common.interface';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { UpdateUserInput } from '@xf/common/src/dtos/user/update-user.input';
import { CreateUserInput } from '@xf/common/src/dtos/user/create-user.input';
import { errorCode } from '@/constants/error-code';
import { CurdService } from '@/common/curd/curd.service';

@Injectable()
export class UserService extends CurdService<User, UpdateUserInput> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    super(userRepository, '用户');
  }

  /**
   * 构建用户信息 (除去保密和无需返回的字段)
   * @param {User} user
   * @param {boolean} [onlyExcludePwd=false] 返回时是否只排除 `password` 字段 default `true`
   * @returns
   * @memberof UserService
   */
  buildUser(user: User, onlyExcludePwd: boolean = false) {
    if (onlyExcludePwd) {
      const { password, ...result } = user;
      return result;
    }

    const { createdAt, updatedAt, ...result } = user;
    return result;
  }

  /**
   * 查找用户
   * @param {*} query 查找参数
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async findOne(query: IKeyStringObj): Promise<User | undefined> {
    const user = await this.userRepository.findOne(query, {
      relations: ['roles'],
    });
    return user;
  }

  /**
   * 查找用户 不存在时报错
   * @param {IKeyStringObj} query
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async findOneAndThrowError(query: IKeyStringObj): Promise<User | void> {
    const user = this.findOne(query);
    if (user) {
      return user;
    }
    const key = Object.keys(query)[0];
    const value = Object.values(query)[0];
    return this.handleNotFoundError(value, key);
  }

  /**
   * 创建用户
   * @param {CreateUserInput} dto
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async create(dto: CreateUserInput): Promise<void> {
    const toCreate = dto;
    const { username } = toCreate;
    const isExisted = await this.findOne({ username });
    if (isExisted) {
      throw new BadRequestException({
        message: '用户名已存在',
        error: { username },
        errno: errorCode.USER_NAME_EXIST,
      });
    }

    // 添加默认角色
    if (!toCreate.roles) {
      const role = await this.rolesRepository.findOne({
        where: { token: 'user' },
      });
      if (role) {
        toCreate.roles = [role];
      } else {
        toCreate.roles = [];
      }
    }

    const toSave = this.userRepository.create(toCreate);
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
  async getUserList(skip: number, take: number): Promise<IPaginationList> {
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
