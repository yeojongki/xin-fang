import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // 利用反射器 `Reflector` 获取指定的键反射元数据
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // `getHandler` 是对路由处理函数的引用
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const hasRole = () =>
      (user.roles as string[]).some(role => roles.includes(role));

    if (user && user.roles && hasRole()) {
      return true;
    } else {
      throw new UnauthorizedException({
        statusCode: 403,
        message: '您的权限不足',
      });
    }
  }
}
