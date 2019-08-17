import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubwayEntity } from './subway.entity';
import { SubwayController } from './subway.controller';
import { SubwayService } from './subway.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubwayEntity])],
  controllers: [SubwayController],
  providers: [SubwayService],
})
export class SubwayModule {}
