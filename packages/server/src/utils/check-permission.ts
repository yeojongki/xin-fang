import { RequestMethod } from '@nestjs/common/enums';
import { IRoute } from '@xf/common/src/interfaces/route.interface';
import { Permission } from '@xf/common/src/entities';

export const authWhiteList = [
  // 登录
  `${RequestMethod.POST} /login`,
  // 注册
  `${RequestMethod.POST} /user`,
  // OSS 回调
  `${RequestMethod.POST} /attachment/oss/callback`,
  // Email 验证
  `${RequestMethod.GET} /email/verify/*`,
];

export const permissionWhiteList = {
  '/user/currentUser': true,
  '/attachment/signature': true,
  '/email/generate': true,
};

export const checkPermission = (
  { path, method, controllerName, methodPath }: IRoute,
  permissions: Permission['token'][] | false,
) => {
  if (permissionWhiteList[path]) return true;
  if (!permissions) return false;

  // GET list => 获取列表权限
  if (method === RequestMethod.GET && methodPath === 'list') {
    return permissions.includes(`${controllerName}.list`);
  }

  // GET item => 获取 item 权限
  if (method === RequestMethod.GET && methodPath === '/') {
    return permissions.includes(`${controllerName}.item`);
  }

  // PUT => 更新权限
  if (method === RequestMethod.PUT) {
    return permissions.includes(`${controllerName}.update`);
  }

  // PUT => 更新权限
  if (method === RequestMethod.POST) {
    return permissions.includes(`${controllerName}.create`);
  }

  // DELETE => 删除权限
  if (method === RequestMethod.DELETE) {
    return permissions.includes(`${controllerName}.delete`);
  }

  return false;
};
