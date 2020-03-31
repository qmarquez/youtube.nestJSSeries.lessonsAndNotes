import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    TypeOrmModule.forFeature([BookRepository, UserRepository]),
    AuthModule
  ]
})
export class BookModule { }
