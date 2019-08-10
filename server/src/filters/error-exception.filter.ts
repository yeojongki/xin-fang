import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import { TExceptionOption } from '@/interfaces/http.interface';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isHttpException = exception instanceof HttpException;
    const httpException = (() => exception as HttpException)();
    const errorResponse = httpException.getResponse
      ? (httpException.getResponse() as TExceptionOption)
      : (exception as TExceptionOption);

    const statusCode = isHttpException
      ? httpException.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      errorResponse.message ||
      errorResponse.error ||
      `unknown error in ${request.url}`;

    response.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}
