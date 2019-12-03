import { Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Get('/verify/:address')
  async verify(@Param('address') address: string) {
    return await this.service.verify(address);
  }
}
