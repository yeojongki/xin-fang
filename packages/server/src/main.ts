import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { HttpResInterceptor } from './interceptor/http-res.interceptor';
import { PermissionAuthGuard } from './guard/permission-auth.guard';
import { ConfigService } from './common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const apiPrefix = configService.get('API_PREFIX');
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalGuards(new PermissionAuthGuard(reflector, apiPrefix));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalInterceptors(new HttpResInterceptor(reflector));
  await app.listen(3000);
}
bootstrap();
