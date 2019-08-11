import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { errorCode } from '@/constants/error-code';

export function now(time: number = 0): number {
  return parseInt(((Date.now() + time) / 1000).toString());
}

export function throwIfValidationError(errors: ValidationError[]) {
  if (errors.length > 0) {
    const errorMsg = errors
      .map(error => Object.values(error.constraints).join(';'))
      .join(';');
    throw new BadRequestException({
      errno: errorCode.VALIDATION_ERROR,
      message: errorMsg,
    });
  }
}
