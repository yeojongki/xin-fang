import { Controller, Get, Req, Query, Post, Body } from '@nestjs/common';
import { RequestWithAuth } from '@xf/common/src/interfaces/http.interface';
import { UpdateEmailInput } from '@xf/common/src/dtos/email/update-email.input';
import { EmailService } from './email.service';
import { Message } from '@/decorators/http.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Message('验证成功')
  @Get('/verifyByLink')
  async verifyByLink(@Query('id') id: string, @Query('email') email: string) {
    return await this.service.verifyByLink(id, email);
  }

  @Message('验证成功')
  @Post('/verifyByCode')
  async verifyByCode(@Body() body: UpdateEmailInput) {
    const { id, email, code } = body;
    return await this.service.verifyByCode(id, email, code);
  }

  @Message('发送成功, 快打开邮件验证吧~')
  @Post('/sendVerifyEmail')
  sendVerifyEmail(@Req() req: RequestWithAuth, @Body('email') email: string) {
    const { id, username } = req.user;
    return this.service.sendVerifyEmail(id, username, email);
  }
}
