import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService
  ]
})
export class AuthModule { }
