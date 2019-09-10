import { PipeTransform, Injectable } from '@nestjs/common';
import { isNotEmpty } from '@xf/common/src/utils/is-empty';

@Injectable()
export class ParseListQuery implements PipeTransform {
  async transform(obj: Record<string, string>) {
    const result = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (isNotEmpty(value)) {
        if (typeof value === 'string') {
          result[key] = value.trim();
        } else {
          result[key] = value;
        }
      }
    });
    return result;
  }
}
