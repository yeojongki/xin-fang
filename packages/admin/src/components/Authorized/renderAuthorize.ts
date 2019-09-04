/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let CURRENT: string | string[] = 'NULL';

type rolesType = string | string[] | (() => typeof CURRENT);
/**
 * use  authority or getAuthority
 * @param {string|()=>String} roles
 */
const renderAuthorize = <T>(Authorized: T): ((roles: rolesType) => T) => (roles: rolesType): T => {
  if (roles) {
    if (typeof roles === 'function') {
      CURRENT = roles();
    }
    if (Object.prototype.toString.call(roles) === '[object String]' || Array.isArray(roles)) {
      CURRENT = roles as string[];
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
};

export { CURRENT };
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized);
