import { IPagination } from '../interfaces/pagination.interface';

export const DEFAULT_PAGE_SIZE = 20;

export const DEFAULT_PAGE_OPTIONS = Array(5)
  .fill(DEFAULT_PAGE_SIZE)
  .map((n, i) => `${n * (i + 1)}`);

export const DEFAULT_PAGINATION: IPagination = {
  pageSize: DEFAULT_PAGE_SIZE,
  current: 1,
};
