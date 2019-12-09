import { Controller, Get, Param, Req, Query, Post } from '@nestjs/common';
import { RequestWithAuth } from '@xf/common/src/interfaces/http.interface';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Get('/verify/:id/:email')
  async verify(@Param('id') id: string, @Param('email') email: string) {
    return await this.service.verify(id, email);
  }

  @Post('/genarateVerifyCode')
  genarateVerifyCode(@Req() req: RequestWithAuth, @Query('email') email: string) {
    const { id } = req.user;
    return this.service.genarateVerifyCode(id, email);
  }
}
