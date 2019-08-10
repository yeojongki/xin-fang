export type TExceptionOption = {
  message: string;
  error?: any;
};

export interface HttpSuccessResponse<T> {
  status: string;
  message: string;
  result: T;
}
