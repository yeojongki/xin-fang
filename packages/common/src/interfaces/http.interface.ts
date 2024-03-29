import { Request } from 'express';
import { IUser } from './user.interfaces';

export interface HttpBaseResponse {
  errno: number;
  message: string;
}

export interface HttpErrorResponse extends HttpBaseResponse {
  error?: any;
  sqlMessage?: string;
  // array [ 'zxc', '4e1ead50-c44d-487d-a96b-ef47618800f7' ]
  parameters?: string[];
  name?: string;
}

export interface HttpSuccessResponse<T = any> extends HttpBaseResponse {
  result: T;
}

export type HttpResonse<T = any> = HttpErrorResponse | HttpSuccessResponse<T>;

export type RequestWithAuth = Request & { user: IUser };
