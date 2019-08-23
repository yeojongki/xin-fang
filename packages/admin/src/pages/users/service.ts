import request from '@/utils/request';
import { IPaginationParams } from '.';

export const getUserList = (params: IPaginationParams) => request('/user/list', { params });

export async function deleteUsers(ids: string[]): Promise<any> {
  return request('/user', {
    method: 'DELETE',
    data: ids,
  });
}
