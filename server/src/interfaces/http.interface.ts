export interface HttpBaseResponse {
  errno: number;
  message: string;
}

export interface HttpErrorResponse extends HttpBaseResponse {
  error?: any;
  sqlMessage?: string;
  name?: string;
}

export interface HttpSuccessResponse extends HttpBaseResponse {
  result: any;
}
