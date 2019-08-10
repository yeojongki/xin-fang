import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesEntity } from '../roles/roles.entity';
import { AuthService } from '../auth/auth.service';
import { ITokenResult } from '../auth/auth.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}

  /**
   * 构建除了密码之外的用户信息
   * 用户不存在(查询结果为空时) -> 400
   * @param {UsersEntity} user
   * @returns
   * @memberof UsersService
   */
  public buildUser(user: UsersEntity) {
    if (user) {
      const { password, createdAt, updatedAt, ...result } = user;
      return result;
    } else {
      throw new HttpException({ error: '用户不存在' }, HttpStatus.BAD_REQUEST);
    }
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
   * 创建用户
   * @param {CreateUserDto} user
   * @returns {Promise<ITokenResult>}
   * @memberof UsersService
   */
  public async create(user: CreateUserDto): Promise<ITokenResult> {
    // 添加默认角色
    if (!user.roles) {
      const role = await this.roleRepository.findOne({
        where: { token: 'default' },
      });
      user.roles = [role];
    }

    const toSave = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(toSave);
    return Promise.resolve(
      this.authService.generateJWT(savedUser.id, savedUser.roles),
    );
  }

  /**
   * 更新用户信息
   * @param {UpdateUserDto} user
   * @returns {Promise<void>}
   * @memberof UsersService
   */
  public async update(user: UpdateUserDto): Promise<void> {
    const { id } = user;
    let toUpdate = await this.findOne({ id });
    if (toUpdate) {
      await this.userRepository.save(Object.assign(toUpdate, user));
      return Promise.resolve();
    } else {
      return Promise.reject({ error: '用户不存在' });
    }
  }
}
