import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { HttpResInterceptor } from './interceptor/http-res.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalInterceptors(new HttpResInterceptor(new Reflector()));
  await app.listen(3000);
}
bootstrap();
