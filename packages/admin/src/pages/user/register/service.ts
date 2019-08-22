import request from '@/utils/request';
import { UserRegisterParams } from './index';

export const register = async (params: UserRegisterParams) => request('/user', {
    method: 'POST',
    data: params,
  });
