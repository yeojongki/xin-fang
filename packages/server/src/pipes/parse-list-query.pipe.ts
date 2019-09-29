import { PipeTransform, Injectable } from '@nestjs/common';
import { isNotEmpty } from '@xf/common/src/utils/is-empty';

@Injectable()
export class ParseListQuery implements PipeTransform {
  async transform(obj: Record<string, string>) {
    const result = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (isNotEmpty(value)) {
        const isString = typeof value === 'string';
        if (isString && value.trim() !== '') {
          result[key] = value.trim();
        } else if (!isString) {
          result[key] = value;
        }
      }
    });
    return result;
  }
}
