import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginInput } from '@xf/common/src/dtos/auth/auth-login.input';
import { ITokenResult } from '@xf/common/src/interfaces/auth.interface';
import { AuthService } from '../auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() user: AuthLoginInput): Promise<ITokenResult> {
    const token = await this.authService.auth(user);
    return token;
  }
}
