import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDTO, SigninDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  signup(@Body() signup: SignupDTO) {
    return this.authService.signup(signup);
  }

  @Post()
  @UsePipes(ValidationPipe)
  signin(@Body() signin: SigninDTO) {
    return this.authService.signin(signin);
  }
}
