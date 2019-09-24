import { IPagination, IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
import request from '@/utils/request';
import { Permission } from '@xf/common/src/entities';

export const getList = (params: IPagination): Promise<IPaginationList<Permission>> => {
  const { pageSize, current, ...rest } = params;
  const query = { ...rest, skip: current - 1, take: pageSize };
  return request('/permission/list', { params: query });
};

export const deleteByIds = (ids: string[]): Promise<void> =>
  request('/permission', {
    method: 'DELETE',
    data: ids,
  });

export const update = (data: any): Promise<void> => request('/permission', { data, method: 'PUT' });

export const create = (data: any): Promise<void> =>
  request('/permission', { data, method: 'POST' });
