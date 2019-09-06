import { IPagination, IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import { IRole } from '@xf/common/src/interfaces/role.interfaces';
import request from '@/utils/request';

export const getList = (params: IPagination): Promise<IPaginationList<IRole>> =>
  request('/role/list', { params });

export const deleteByIds = (ids: string[]): Promise<void> =>
  request('/role', {
    method: 'DELETE',
    data: ids,
  });

export const update = (data: any): Promise<void> => request('/role', { data, method: 'PUT' });

export const create = (data: any): Promise<void> => request('/role', { data, method: 'POST' });
