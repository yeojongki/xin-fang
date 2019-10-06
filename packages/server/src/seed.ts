import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SeedService } from '@/common/seed/seed.service';

class Seed {
  async init() {
    const logger = new Logger('DB-Seed');
    logger.log('start seed ...');

    // for connect db
    const app = await NestFactory.create(AppModule);
    const seedService = await app.get(SeedService);

    // init datas
    await seedService.initPermissions();
    await seedService.initRoles();
    await seedService.initUsers();
  }
}

new Seed().init();
