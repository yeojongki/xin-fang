import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenResult } from '@xf/common/src/interfaces/auth.interface';
import { AuthLoginInput } from '@xf/common/src/dtos/auth/auth-login.input';
import { User } from '@xf/common/src/entities';
import { errorCode } from '@/constants/error-code';
import { TOKEN_EXPIRED } from '@/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * 根据用户名和密码验证用户信息 返回 token
   * @param {AuthLoginInput} auth 待验证的用户信息
   * @returns {Promise<ITokenResult>}
   * @memberof AuthService
   */
  public async auth(auth: AuthLoginInput): Promise<ITokenResult> {
    const { username, password } = auth;
    const user = await this.userService.findOneWithPassword({ username });
    if (user && user.password === password) {
      return this.generateJWT(user.id);
    }

    throw new BadRequestException({
      errno: errorCode.LOGIN_ERROR,
      message: '用户名或密码错误',
    });
  }

  /**
   * 生成含有 `id` 的 jwt
   * @param {(string | number)} id
   * @returns {ITokenResult}
   * @memberof AuthService
   */
  public generateJWT(id: string | number): ITokenResult {
    return {
      accessToken: this.jwtService.sign({ id }),
      expiredIn: TOKEN_EXPIRED,
    };
  }

  public async validateUser(id: string): Promise<User | undefined> {
    return await this.userService.findOne({ id });
  }
}
