import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function now(time: number = 0): number {
  return parseInt(((Date.now() + time) / 1000).toString());
}

export function throwIfValidationError(errors: ValidationError[]) {
  if (errors.length > 0) {
    const errorMsg = errors
      .map(error => Object.values(error.constraints).join(';'))
      .join(';');
    throw new BadRequestException(errorMsg);
  }
}
