import { SetMetadata } from '@nestjs/common';
import { META_RES_MSG } from '@/constants/metadata-key.const';

export function Message(msg: string) {
  return (_, __, descriptor: PropertyDescriptor) => {
    SetMetadata(META_RES_MSG, msg)(descriptor.value);
    return descriptor;
  };
}
