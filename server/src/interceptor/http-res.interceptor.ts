import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { HttpSuccessResponse } from '@/interfaces/http.interface';
import { META_RES_MSG } from '@/constants/metadata-key.const';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class HttpResInterceptor<T>
  implements NestInterceptor<T, HttpSuccessResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpSuccessResponse<T>> {
    const message = this.reflector.get<string>(
      META_RES_MSG,
      context.getHandler(),
    );
    return next.handle().pipe(
      map(result => {
        return {
          errno: errorCode.SUCCESS,
          message: message || '',
          result,
        };
      }),
    );
  }
}
