import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JWT_SECRET } from '@/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    } as StrategyOptions);
  }

  async validate({ id, roles }): Promise<any> {
    return { id, roles };
  }
}
