import { Md5 as _Md5 } from 'ts-md5';
import { ITokenResult } from '@/pages/user/login/login.interface';
import { TOKEN_KEY } from '@/config';

export function Md5(string: string): string {
  return _Md5.hashStr(string, false) as string;
}

/**
 * 检测token是否失效 有效时返回token
 * @param {ICheckToken} info
 * @returns {(boolean | string)}
 */
export function checkTokenExpired(
  info: ITokenResult & { ts: number } | undefined,
): boolean | string {
  if (info) {
    const { expired_in, ts, access_token } = info;
    if (expired_in * 1000 + ts < +new Date()) {
      removeStorageToken();
      return false;
    }
    return access_token;
  }
  removeStorageToken();
  return false;
}

export function removeStorageToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}
