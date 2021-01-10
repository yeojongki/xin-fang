import { Controller, Put, Get, BadRequestException } from '@nestjs/common';
import fs = require('fs-extra');
import { ConfigService } from '@/common/config/config.service';
import { errorCode } from '@/constants/error-code';
import { SystemService } from '@/common/system/system.service';

@Controller('house-spider')
export class HouseSpiderController {
  constructor(
    private readonly configService: ConfigService,
    private readonly systemService: SystemService,
  ) {}

  @Get('isOpened')
  isOpened() {
    return this.configService.IS_OPEN_HOUSE_SPIDER;
  }

  @Put('toggleSpiderOpen')
  async toggleSpiderOpen() {
    const file = `.env.${process.env.NODE_ENV}`;
    const fileStr = await fs.readFile(file, 'utf-8');
    const reg = /(IS_OPEN_HOUSE_SPIDER=)(\d)/;
    const matched = fileStr.match(reg);
    if (matched && matched[1] && matched[2]) {
      const nextOpenStatus = +matched[2] === 1 ? 0 : 1;
      const nextFileStr = fileStr.replace(
        `${matched[1]}${matched[2]}`,
        `${matched[1]}${nextOpenStatus}`,
      );
      // 重新写入文件
      await fs.writeFile(file, nextFileStr);
      return await this.systemService.run('pm2 restart xf-server');
    }
    throw new BadRequestException({
      errno: errorCode.CONFIG_FIELD_NOT_FOUND,
      message: '获取配置文件中的 IS_OPEN_HOUSE_SPIDER 失败',
    });
  }
}
