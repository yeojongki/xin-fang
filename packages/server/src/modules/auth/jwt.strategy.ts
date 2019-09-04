import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JWT_SECRET } from '@/config';
import { errorCode } from '@/constants/error-code';
import { AuthService } from './auth.service';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: JWT_SECRET,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(options);
  }

  async validate({ id }) {
    return await this.authService.validateUser(id);
  }
}
