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

  // GET list => 请求列表 则需要权限 controllerName.list
  if (method === RequestMethod.GET && methodPath === 'list') {
    return permissions.includes(`${controllerName}.list`);
  }

  return false;
};
