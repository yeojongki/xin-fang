import { Module, Global } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

@Global()
@Module({
  controllers: [ConfigController],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env.${process.env.NODE_ENV}`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
