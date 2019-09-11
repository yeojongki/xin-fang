import { FindConditions } from 'typeorm';

interface IListQuery {
  skip: number;
  take: number;
  pageSize: number;
  current: number;
  [key: string]: any;
}

export type TListQuery<T> = FindConditions<T> & IListQuery;
