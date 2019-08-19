import request from '@/utils/request';
import { IPagination } from '.';

export const getUserList = (data: IPagination) => {
  return request('/user/list', { data });
};
