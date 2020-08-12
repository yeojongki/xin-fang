export interface IPagination {
  total?: number;
  current: number;
  pageSize: number;
}

export interface IPaginationList<T> {
  list: T[];
  pagination: IPagination;
}
