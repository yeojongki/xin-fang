import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { authWhiteList, checkPermission } from '@xf/common/src/utils/check-permission';
import { Reflector } from '@nestjs/core';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { errorCode } from '@/constants/error-code';
import { API_PREFIX } from '@/config';

export type IAuthRequest = { path: string } & { user: IUser };

export class PermissionAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request: IAuthRequest = context.switchToHttp().getRequest();
    const methodPath = this.reflector.get(PATH_METADATA, context.getHandler());
    const controllerName = this.reflector.get(PATH_METADATA, context.getClass());
    const method = this.reflector.get(METHOD_METADATA, context.getHandler());

    // total path without prefix
    const path = (request.path as string).replace(`/${API_PREFIX}`, '');

    // check authWhiteList
    if (authWhiteList.includes(path)) return true;

    // https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts#L36
    const jwtCheck = super.canActivate(context);

    if (jwtCheck instanceof Promise) {
      return jwtCheck.then(() => {
        // check jwt success
        // !: must call `super.canActivate(context)` and get it
        // see https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts#L48
        const { user } = request;
        let userPermissions: false | string[] = false;
        if (user && user.permissions) {
          userPermissions = user.permissions;
        }
        const isPassPermission = checkPermission(
          { method, controllerName, methodPath, path },
          userPermissions,
        );

        if (!isPassPermission) {
          throw new UnauthorizedException({
            message: '用户权限不足',
            error: path,
            errno: errorCode.PERMISSION_ERROR,
          });
        }
        return isPassPermission;
      });
    }
    return jwtCheck;
  }

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
