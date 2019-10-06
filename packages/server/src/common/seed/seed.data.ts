import { CreatePermissionInput } from '@xf/common/src/dtos/permission/create-permission.input';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';
import { CreateUserInput } from '@xf/common/src/dtos/user/create-user.input';

export const usersSeed: CreateUserInput[] = [
  {
    username: 'yeojongki',
    password: 'e10adc3949ba59abbe56e057f20f883e',
  },
  {
    username: 'admin',
    password: 'e10adc3949ba59abbe56e057f20f883e',
  },
  {
    username: 'viewer',
    password: 'e10adc3949ba59abbe56e057f20f883e',
  },
];

export const permissionsSeed: CreatePermissionInput[] = [
  // permission
  { module: 'permission', token: 'permission.create', name: '权限创建' },
  { module: 'permission', token: 'permission.list', name: '权限列表' },
  { module: 'permission', token: 'permission.item', name: '权限详情' },
  { module: 'permission', token: 'permission.update', name: '权限更新' },
  { module: 'permission', token: 'permission.delete', name: '权限删除' },

  // user
  { module: 'user', token: 'user.create', name: '用户创建' },
  { module: 'user', token: 'user.list', name: '用户列表' },
  { module: 'user', token: 'user.item', name: '用户详情' },
  { module: 'user', token: 'user.update', name: '用户更新' },
  { module: 'user', token: 'user.delete', name: '用户删除' },

  // city
  { module: 'city', token: 'city.list', name: '城市列表' },
  { module: 'city', token: 'city.update', name: '城市更新' },
  { module: 'city', token: 'city.item', name: '城市详情' },

  // role
  { module: 'role', token: 'role.create', name: '角色创建' },
  { module: 'role', token: 'role.list', name: '角色列表' },
  { module: 'role', token: 'role.item', name: '角色详情' },
  { module: 'role', token: 'role.update', name: '角色更新' },
  { module: 'role', token: 'role.delete', name: '角色删除' },

  // subway
  { module: 'subway', token: 'subway.list', name: '地铁列表' },
];

export const rolesSeed: CreateRoleInput[] = [
  {
    token: 'superAdmin',
    name: '超级管理员',
  },
  {
    token: 'user',
    name: '普通用户',
  },
];
