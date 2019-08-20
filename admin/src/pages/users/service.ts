import request from '@/utils/request';
import { IPaginationParams } from '.';

export const getUserList = (params: IPaginationParams) => {
  return request('/user/list', { params });
};
