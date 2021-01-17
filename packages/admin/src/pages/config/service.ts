import request from '@/utils/request';

export const getSpiderConfig = () => request('/config/spider-config');

export const updateSpiderConfig = (data: any): Promise<void> =>
  request('/config/spider-config', { data, method: 'PUT' });
