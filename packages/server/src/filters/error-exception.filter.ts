import { ExceptionFilter, HttpException, ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '@xf/common/src/interfaces/http.interface';
import { errorCode } from '@/constants/error-code';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log('exception', request.url, exception);

    const isHttpException = exception instanceof HttpException;
    const httpException = (() => exception as HttpException)();
    const errorResponse = httpException.getResponse
      ? (httpException.getResponse() as HttpErrorResponse)
      : (exception as HttpErrorResponse);

    const statusCode = isHttpException
      ? httpException.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = errorResponse.message || `unknown error in ${request.url}`;
    let errno = errorResponse.errno || errorCode.ERROR;
    let { error } = errorResponse;

    // 数据库错误
    if (errorResponse.sqlMessage) {
      message = 'DB Error：';
      error = errorResponse.sqlMessage;
      if ((error as string).indexOf('Duplicate') > -1) {
        const params = errorResponse.parameters;
        error = (params && `<${params[0]}> 已重复!`) || error;
      }
      errno = errorCode.DB_OPERATE_ERROR;
    }

    response.status(statusCode).json({
      errno,
      error,
      message,
    });
  }
}
