import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { HttpResInterceptor } from './interceptor/http-res.interceptor';
import { PermissionAuthGuard } from './guard/permission-auth.guard';
import { API_PREFIX } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalGuards(new PermissionAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalInterceptors(new HttpResInterceptor(reflector));
  await app.listen(3000);
}
bootstrap();
