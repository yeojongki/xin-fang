import { RequestMethod } from '@nestjs/common/enums';
import { IRoute } from '@xf/common/src/interfaces/route.interface';
import { Permission } from '@xf/common/src/entities';

const requestMethodMap = {
  [RequestMethod.POST]: 'post',
  [RequestMethod.GET]: 'get',
  [RequestMethod.PUT]: 'put',
  [RequestMethod.DELETE]: 'delete',
};

/**
 * 免认证的路由 不需要传 token
 */
export const authWhiteList = [
  // 登录
  `${RequestMethod.POST} /login`,
  // 注册
  `${RequestMethod.POST} /user`,
  // OSS 回调
  `${RequestMethod.POST} /attachment/oss/callback`,
  // Email 验证
  `${RequestMethod.GET} /email/verifyByLink`,
];

/**
 * 免权限的路由列表 不需要用户权限
 */
export const permissionWhiteList = {
  '/user/currentUser': true,
  '/attachment/signature': true,
  '/email/sendVerifyEmail': true,
  '/email/verifyByCode': true,
  '/test/req': true,
  '/test/proxy': true,
};

export const checkPermission = (
  { path, method, controllerName, methodPath }: IRoute,
  permissions: Permission['token'][] | false,
) => {
  if (permissionWhiteList[path]) return true;
  if (!permissions) return false;

  const infoArr = [requestMethodMap[method], controllerName, methodPath];
  if (methodPath === ':id' || methodPath === '/') {
    infoArr.splice(infoArr.length - 1, 1);
  }

  const permission = infoArr.join('.');
  return permissions.includes(permission);
};
