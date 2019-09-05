import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import request from '@/utils/request';

export const getUserList = (params: IPagination) => request('/user/list', { params });

export async function deleteByIds(ids: string[]): Promise<any> {
  return request('/user', {
    method: 'DELETE',
    data: ids,
  });
}

export const update = (data: any): Promise<void> => request('/user', { data, method: 'PUT' });

export const create = (data: any): Promise<void> => request('/user', { data, method: 'POST' });
