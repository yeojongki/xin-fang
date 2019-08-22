import request from '@/utils/request';
import { IPaginationParams } from '.';

export const getUserList = (params: IPaginationParams) => request('/user/list', { params });

export async function deleteUser(id: string): Promise<any> {
  return request(`/user/${id}`, {
    method: 'DELETE',
  });
}
