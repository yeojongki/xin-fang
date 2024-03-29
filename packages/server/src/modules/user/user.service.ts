import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from '@xf/common/src/entities/user.entity';
import { Role } from '@xf/common/src/entities/role.entity';
import { TKeyStringObj } from '@xf/common/src/interfaces/common.interface';
import { UpdateUserInput } from '@xf/common/src/dtos/user/update-user.input';
import { CreateUserInput } from '@xf/common/src/dtos/user/create-user.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { DEFAULT_ROLE } from '@xf/common/src/constants/roles.const';
import { isNotEmpty } from '@xf/common/src/utils/is-empty';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
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
   * 查找用户
   * @param {*} query 查找参数
   * @returns {Promise<User>}
   * @memberof UserService
   */
  @TransformClassToPlain()
  async findOne(query: TKeyStringObj): Promise<User | undefined> {
    return await this.userRepository.findOne(query, {
      relations: ['roles', 'roles.permissions', 'houses'],
    });
  }

  /**
   * 查找用户 (返回含 `密码` 字段)
   * @param {TKeyStringObj} query
   * @returns
   * @memberof UserService
   */
  async findOneWithPassword(query: TKeyStringObj) {
    return await this.userRepository.findOne(query, {
      relations: ['roles'],
    });
  }

  /**
   * 查找用户 不存在时报错
   * @param {TKeyStringObj} query
   * @returns {Promise<User>}
   * @memberof UserService
   */
  async findOneAndThrowError(query: TKeyStringObj): Promise<User> {
    const user = await this.findOne(query);
    if (user) {
      return user;
    }
    const key = Object.keys(query)[0];
    const value = Object.values(query)[0];
    throw this.handleNotFoundError(value, key);
  }

  /**
   * 创建用户
   * @param {CreateUserInput} dto
   * @returns {Promise<void>}
   * @memberof UserService
   */
  async create(dto: CreateUserInput): Promise<User> {
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
    const roles = await this.getRolesByToken(toCreate.roles);
    const toSave = this.userRepository.create({ ...toCreate, roles });
    return await this.userRepository.save(toSave);
  }

  /**
   * 查找并记数
   * @override
   * @param {number} skip
   * @param {number} take
   * @returns {Promise<[User[], number]>}
   * @memberof UserService
   */
  async findAndCount(query: TListQuery<User>): Promise<[User[], number]> {
    const { skip, take, roles, createdAt, username, email, ...rest } = query;
    const qb = this.userRepository.createQueryBuilder('user');
    qb.leftJoinAndSelect('user.roles', 'role');

    // if (roles && Array.isArray(roles)) {
    //   const length = roles.length;
    //   console.log('roles', roles);
    //   qb.where('role.token IN (:...roles)', { roles });
    //   // qb.where('role.token IN (:...roles)', { roles }).groupBy('user.username');

    //   // .having('COUNT(user.username) = :length', { length });
    // } else if (isNotEmpty(roles)) {
    //   qb.where('role.token = :roles', { roles });
    // }

    qb.where({ ...rest });

    if (username) {
      qb.andWhere(`user.username LIKE '%${username}%'`);
    }

    if (email) {
      qb.andWhere(`user.email LIKE '%${email}%'`);
    }

    if (isNotEmpty(createdAt) && Array.isArray(createdAt)) {
      qb.andWhere(`user.createdAt BETWEEN '${createdAt[0]}' AND '${createdAt[1]}'`);
    }

    if (isNotEmpty(roles)) {
      qb.andWhere('role.token = :roles', { roles });
    }

    qb.skip(skip * take).take(take);

    return await qb.getManyAndCount();
  }

  /**
   * 根据标识获取角色完整信息
   * @param {(string[] | undefined | null)} tokenArr
   * @returns {Promise<Role[]>}
   * @memberof UserService
   */
  async getRolesByToken(tokenArr?: string[] | null): Promise<Role[]> {
    const toFind = tokenArr && tokenArr.length ? tokenArr : [DEFAULT_ROLE];
    // query for role
    const where = toFind.map((token) => ({ token }));
    const roles = await this.rolesRepository.find({
      where,
    });
    if (!roles) {
      console.warn('role not found：', tokenArr);
    }
    return roles || [];
  }

  /**
   * 更新数据 数据实体不存在 id 时抛错
   */
  async update(dto: UpdateUserInput): Promise<User> {
    const { id } = dto;
    const toUpdate = await this.findOneAndThrowError({ id });
    toUpdate.roles = await this.getRolesByToken(
      dto.roles ? dto.roles : ((toUpdate.roles as any) as string[]),
    );
    delete dto.roles;
    return await this.repository.save(Object.assign(toUpdate, dto));
  }

  async save(user: IUser, roles?: Role[]): Promise<User> {
    if (!roles) {
      user.roles = await this.getRolesByToken((user.roles as any) as string[]);
    }
    return await this.repository.save(user);
  }
}
