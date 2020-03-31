import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDTO, SigninDTO, LoggedInDTO } from './dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roleType.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async signup(signup: SignupDTO) {
    const { username, email } = signup;
    const user = this.authRepository.findOne({ where: [{ username }, { email }] })

    if (user) { throw new ConflictException('username or email already exists.'); }

    return this.authRepository.signup(signup);
  }

  async signin(signin: SigninDTO): Promise<LoggedInDTO> {
    const { username, password } = signin;

    const user = await this.authRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('username does not exists.');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const { id, email } = user;

    const payload: IJwtPayload = {
      id,
      email,
      roles: user.roles.map(({ name }) => name as RoleType),
      username
    }

    const token = this.jwtService.sign(payload);

    return plainToClass(LoggedInDTO, { token, user });
  }
}
