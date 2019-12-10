import { Controller, Get, Param, Req, Query, Post, Body } from '@nestjs/common';
import { RequestWithAuth } from '@xf/common/src/interfaces/http.interface';
import { EmailService } from './email.service';
import { Message } from '@/decorators/http.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Get('/verify/:id/:email')
  async verify(@Param('id') id: string, @Param('email') email: string) {
    return await this.service.verify(id, email);
  }

  @Message('发送成功, 快打开邮件验证吧~')
  @Post('/genarateVerifyCode')
  genarateVerifyCode(@Req() req: RequestWithAuth, @Body('email') email: string) {
    const { id, username } = req.user;
    return this.service.genarateVerifyCode(id, username, email);
  }
}
