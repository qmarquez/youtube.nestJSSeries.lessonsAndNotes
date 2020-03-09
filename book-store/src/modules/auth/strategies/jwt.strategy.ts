import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { configuration } from '../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(configuration.JWT_SECRET)
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;

    const user = await this.authRepository.findOne({ where: { username, status: 'ACTIVE' } });

    if (!user) { throw new UnauthorizedException(); }

    return payload;
  }

}