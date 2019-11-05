import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import request from '@/utils/request';

export const getList = (params: IPagination) => {
  const { pageSize, current, ...rest } = params;
  const query = { ...rest, skip: current - 1, take: pageSize };
  return request('/house/list', { params: query });
};

export async function deleteByIds(ids: string[]): Promise<any> {
  return request('/house', {
    method: 'DELETE',
    data: ids,
  });
}

export const update = (data: any): Promise<void> => request('/house', { data, method: 'PUT' });

export const create = (data: any): Promise<void> => request('/house', { data, method: 'POST' });
