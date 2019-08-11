import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesEntity } from '../roles/roles.entity';
import { CommonService } from '@/common/common.service';

@Injectable()
export class UsersService extends CommonService<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {
    super(userRepository);
  }

  /**
   * 构建用户信息 (除去保密和无需返回的字段)
   * @param {UsersEntity} user
   * @returns
   * @memberof UsersService
   */
  public buildUser(user: UsersEntity) {
    const { password, createdAt, updatedAt, ...result } = user;
    return result;
  }


  /**
   * 查找用户
   * @param {*} query 查找参数
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  public async findOne(query: any): Promise<UsersEntity> {
    return await this.userRepository.findOne(query, { relations: ['roles'] });
  }

  /**
   * 查找用户 如果用户不存在则抛出错误
   * @param {*} query
   * @returns {Promise<UsersEntity>}
   * @memberof UsersService
   */
  public async findOneAndThrowError(query: any): Promise<UsersEntity> {
    const user = this.findOne(query);
    if (!user) {
      this.throwNotFoundError('用户不存在', query);
    }
    return user;
  }

  /**
   * 创建用户
   * @param {CreateUserDto} user
   * @returns {Promise<ITokenResult>}
   * @memberof UsersService
   */
  public async create(user: CreateUserDto): Promise<UsersEntity> {
    // 添加默认角色
    if (!user.roles) {
      const role = await this.rolesRepository.findOne({
        where: { token: 'default' },
      });
      role ? (user.roles = [role]) : (user.roles = []);
    }

    const toSave = this.userRepository.create(user);
    return await this.userRepository.save(toSave);
  }

  /**
   * 用户不存在抛出错误
   * @param {string} id 用户Id
   * @memberof UsersService
   */
  public handleNotFoundError(id: string) {
    this.throwNotFoundError('用户不存在', { id });
  }
}
