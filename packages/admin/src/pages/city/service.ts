import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import request from '@/utils/request';
import { namespace } from '.';

export const getList = (params: IPagination) => {
  const { pageSize, current, ...rest } = params;
  const query = { ...rest, skip: current - 1, take: pageSize };
  return request(`/${namespace}/list`, { params: query });
};

export const update = (data: any): Promise<void> =>
  request(`/${namespace}`, { data, method: 'PUT' });

export const getSubwaysByCityId = (cityId: number) =>
  request('/subway/list', { params: { cityId, pageSize: 9999 } });
