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
    const { expiredIn, ts, accessToken } = info;
    if (expiredIn * 1000 + ts < +new Date()) {
      removeStorageToken();
      return false;
    }
    return accessToken;
  }
  removeStorageToken();
  return false;
}

export function removeStorageToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}
