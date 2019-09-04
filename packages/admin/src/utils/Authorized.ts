import RenderAuthorize from '@/components/Authorized';
import { getStorageRoles } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getStorageRoles());

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getStorageRoles());
};

export { reloadAuthorized };
export default Authorized;
