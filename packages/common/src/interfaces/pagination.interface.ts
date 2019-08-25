export interface IPagination {
  total: number;
  current: number;
  pageSize: number;
}

export interface IPaginationList {
  list: any[];
  pagination: IPagination;
}
