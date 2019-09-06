import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TRole } from '@xf/common/src/interfaces/role.interfaces';
import { errorCode } from '@/constants/error-code';

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
    const userRoles: TRole[] = user.roles;
    const hasRole = () => userRoles.some(role => roles.includes(role));
    if (user && user.roles && hasRole()) {
      return true;
    }
    throw new ForbiddenException({
      statusCode: 403,
      errno: errorCode.ROLE_AUTH_ERROR,
      message: '您的权限不足',
    });
  }
}
