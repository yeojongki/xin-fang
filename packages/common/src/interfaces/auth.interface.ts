export interface ITokenResult {
  expiredIn: number;
  accessToken: string;
}
export interface ITokenResultWithTs extends ITokenResult {
  ts: number;
}
