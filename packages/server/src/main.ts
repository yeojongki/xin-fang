import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { HttpResInterceptor } from './interceptor/http-res.interceptor';
import { PermissionAuthGuard } from './guard/permission-auth.guard';
import { ConfigService } from './common/config/config.service';
import { errorCode } from './constants/error-code';
import { HouseSpiderService } from './modules/house-spider/house-spider.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const apiPrefix = configService.get('API_PREFIX');
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalGuards(new PermissionAuthGuard(reflector, apiPrefix));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorMsg = errors
            .map((error) => Object.values(error.constraints).join(';'))
            .join(';');
          throw new BadRequestException({
            errno: errorCode.VALIDATION_ERROR,
            message: errorMsg,
          });
        }
      },
    }),
  );
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalInterceptors(new HttpResInterceptor(reflector));

  await app.listen(configService.get('SERVER_PORT'));
  const houseSpiderService = app.get(HouseSpiderService);
  houseSpiderService.startCronJob();
  // houseSpiderService.startCronJob(new Date(+new Date() + 2000));
}
bootstrap();
