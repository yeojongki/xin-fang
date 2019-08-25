import { IPagination } from '@xf/common/interfaces/pagination.interface';
import request from '@/utils/request';

export const getUserList = (params: IPagination) => request('/user/list', { params });

export async function deleteUsers(ids: string[]): Promise<any> {
  return request('/user', {
    method: 'DELETE',
    data: ids,
  });
}
