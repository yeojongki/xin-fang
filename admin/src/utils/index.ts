import { Md5 as _Md5 } from 'ts-md5';

export function Md5(string: string): string {
  return _Md5.hashStr(string, false) as string;
}
