import { TRole } from '@xf/common/src/interfaces/role.interfaces';
import { ITokenResult, ITokenResultWithTs } from '@xf/common/src/interfaces/auth.interface';
import { STORAGE_TOKEN_KEY, STORAGE_ROLE_KEY } from '@/config';
import { CurrentUser } from '@/models/user';

// check user isLogin
export function checkIsLogin(user: CurrentUser | undefined): boolean {
  return Boolean((user && user.username) || getStorageRoles());
}

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getStorageRoles(): string | string[] {
  const authorityString = localStorage.getItem(STORAGE_ROLE_KEY);
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}

/**
 * 存储角色 到 storage 中
 * @export
 * @param {TRole[]} roles
 * @returns {void}
 */
export function setStorageRoles(roles: TRole[]): void {
  return localStorage.setItem(STORAGE_ROLE_KEY, JSON.stringify(roles));
}

/**
 * 移除 角色
 */
export function removeStorageRoles(): void {
  localStorage.removeItem(STORAGE_ROLE_KEY);
}

/**
 * 存储 token 到 storage 中
 * @param {ITokenResult} token
 */
export function setStorageToken(token: ITokenResult): void {
  localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify({ ...token, ts: +new Date() }));
}

/**
 * 从 storage 中获取 token 过期或不存在则为 false
 * @export
 * @returns {(string| boolean)}
 */
export function getStorageToken(): string | boolean {
  let tokenInfo: ITokenResultWithTs;
  try {
    tokenInfo = JSON.parse(window.localStorage.getItem(STORAGE_TOKEN_KEY) as string);
    return checkTokenExpired(tokenInfo);
  } catch (error) {
    console.error('parse token error', error);
    return false;
  }
}

/**
 * 移除 token
 */
export function removeStorageToken(): void {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
}

/**
 * 检测token是否失效 有效时返回token 反之为false
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
      return true;
    }
    return accessToken;
  }
  return false;
}
