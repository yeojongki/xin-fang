import request from '@/utils/request';
import { FormDataType } from './index';

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/login/captcha?mobile=${mobile}`);
// }

export const accountLogin = (params: FormDataType) => {
  return request('/login', {
    method: 'POST',
    data: params,
  });
};

export const getCurrentUser = () => request('/user/self');
