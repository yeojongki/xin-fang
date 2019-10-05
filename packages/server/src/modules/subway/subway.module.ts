import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subway } from '@xf/common/src/entities/subway.entity';
import { SubwayController } from './subway.controller';
import { SubwayService } from './subway.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subway])],
  controllers: [SubwayController],
  providers: [SubwayService],
})
export class SubwayModule {}
