import { IPagination } from '@xf/common/src/interfaces/pagination.interface';
import request from '@/utils/request';

export const getList = (params: IPagination) => request('/role/list', { params });
