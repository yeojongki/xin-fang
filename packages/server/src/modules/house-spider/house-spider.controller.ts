import { Controller, Put, Get, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@/common/config/config.service';
import { errorCode } from '@/constants/error-code';
import { HouseSpiderService } from './house-spider.service';

@Controller('house-spider')
export class HouseSpiderController {
  constructor(
    private readonly configService: ConfigService,
    private readonly houseSpiderService: HouseSpiderService,
  ) {}

  @Get('isOpened')
  isOpened() {
    return this.configService.SPIDER_IS_OPEN_HOUSE;
  }

  @Put('toggleSpiderOpen')
  async toggleSpiderOpen() {
    try {
      return await this.houseSpiderService.toggleSpiderOpen();
    } catch (error) {
      throw new BadRequestException({
        errno: errorCode.CONFIG_FIELD_NOT_FOUND,
        message: error.message,
      });
    }
  }
}
