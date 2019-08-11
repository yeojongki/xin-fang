import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenResult } from './auth.interface';
import { RolesEntity } from '../roles/roles.entity';
import { TOKEN_EXPIRED } from '@/config';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../login/dto/login-user.dto';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 根据用户名和密码验证用户信息 返回 token
   * @param {LoginUserDto} auth 待验证的用户信息
   * @returns {Promise<ITokenResult>}
   * @memberof AuthService
   */
  public async auth(auth: LoginUserDto): Promise<ITokenResult> {
    const { username, password } = auth;
    const user = await this.usersService.findOne({ username });
    if (user && user.password === password) {
      return Promise.resolve(this.generateJWT(user.id, user.roles));
    }

    throw new BadRequestException({
      errno: errorCode.LOGIN_ERROR,
      message: '用户名或密码错误',
    });
  }

  /**
   * 生成含有 `id` 和 `roles` 的 jwt
   * @param {(string | number)} id
   * @param {RolesEntity[]} roles
   * @returns {ITokenResult}
   * @memberof AuthService
   */
  public generateJWT(id: string | number, roles: RolesEntity[]): ITokenResult {
    const tokens = roles.map(role => role.token);
    return {
      access_token: this.jwtService.sign({ id, roles: tokens }),
      expired_in: TOKEN_EXPIRED,
    };
  }

  public async validateUser(id: string) {
    return await this.usersService.findOne({ id });
  }
}
