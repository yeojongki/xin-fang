import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JWT_SECRET } from '@/config';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: JWT_SECRET,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(options);
  }

  async validate({ id, roles }) {
    return { id, roles };
  }
}
