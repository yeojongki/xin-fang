import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() user: LoginUserDto) {
    return await this.authService.auth(user);
  }
}
