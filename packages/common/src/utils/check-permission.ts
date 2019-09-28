import { RequestMethod } from '@nestjs/common/enums';
import { IRoute } from '../interfaces/route.interface';
import { Permission } from '../entities';

export const authWhiteList = ['/login'];

export const permissionWhiteList = {
  '/user/currentUser': true,
};

export const checkPermission = (
  { path, method, controllerName, methodPath }: IRoute,
  permissions: Permission['token'][] | false,
) => {
  if (permissionWhiteList[path]) return true;
  if (permissions === false) return false;

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

  // DELETE => 删除权限
  if (method === RequestMethod.DELETE) {
    return permissions.includes(`${controllerName}.delete`);
  }

  return false;
};
