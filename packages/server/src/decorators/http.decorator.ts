import { SetMetadata } from '@nestjs/common';
import { META_RES_MSG } from '@/constants/metadata-key.const';

export type THttpResponseMsg = [string, number];

export function Message(data: THttpResponseMsg | string) {
  return (_, __, descriptor: PropertyDescriptor) => {
    SetMetadata(META_RES_MSG, data)(descriptor.value);
    return descriptor;
  };
}
