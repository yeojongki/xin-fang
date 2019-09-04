import { IPagination, IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import { UpdateRoleInput } from '@xf/common/src/dtos/role/update-role.input';
import { CreateRoleInput } from '@xf/common/src/dtos/role/create-role.input';
import request from '@/utils/request';

export const getList = (params: IPagination): Promise<IPaginationList<IRole>> =>
  request('/role/list', { params });

export const deleteRoles = (ids: string[]): Promise<void> =>
  request('/role', {
    method: 'DELETE',
    data: ids,
  });

export const update = (data: UpdateRoleInput): Promise<void> =>
  request('/role', { data, method: 'PUT' });

export const create = (data: CreateRoleInput): Promise<void> =>
  request('/role', { data, method: 'POST' });
