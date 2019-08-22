import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { errorCode } from '@/constants/error-code';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err) throw err;
    if (!user) {
      throw new UnauthorizedException({
        message: '用户身份不合法',
        errno: errorCode.JWT_NOT_FOUND,
      });
    }
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        message: '用户身份已过期',
        errno: errorCode.JWT_EXPIRED,
      });
    }
    return user;
  }
}
