import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { status } from '../../shared/status.enum';
import { ReadBookDTO, CreateBookDTO, UpdateBookDTO } from './dto';
import { plainToClass } from 'class-transformer';
import { In } from 'typeorm';
import { User } from '../user/user.entity';
import { RoleType } from '../role/roleType.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async get(id: number): Promise<ReadBookDTO> {
    const book = await this.bookRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return plainToClass(ReadBookDTO, book);
  }

  async getAll(): Promise<ReadBookDTO[]> {
    const books = await this.bookRepository.find({ where: { status: status.ACTIVE } });

    return books.map(book => plainToClass(ReadBookDTO, book));
  }

  async getBooksByAuthor(authorId: number): Promise<ReadBookDTO[]> {
    const books = await this.bookRepository.find({ where: { status: status.ACTIVE, authors: In([authorId]) } });

    return books.map(book => plainToClass(ReadBookDTO, book));
  }

  async create(book: Partial<CreateBookDTO>): Promise<ReadBookDTO> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const author = await this.userRepository.findOne(authorId, { where: { status: status.ACTIVE } });

      if (!author) {
        throw new NotFoundException(`Author with id:${authorId} not exists`);
      }

      const isAuthor = author.roles.some(({ name }) => name === RoleType.AUTHOR);

      if (!isAuthor) {
        throw new UnauthorizedException(`User with id:${authorId} is not author.`);
      }

      authors.push(author);
    }

    const savedBook = await this.bookRepository.save({
      name: book.name,
      description: book.description,
      authors
    });

    return plainToClass(ReadBookDTO, savedBook);
  }

  async createByAuthor(book: Partial<CreateBookDTO>, authorId: number): Promise<ReadBookDTO> {
    const author = await this.userRepository.findOne(authorId, { where: { status: status.ACTIVE } });

    if (!author) {
      throw new NotFoundException(`Author with id:${authorId} not exists`);
    }

    const isAuthor = author.roles.some(({ name }) => name === RoleType.AUTHOR);

    if (!isAuthor) {
      throw new UnauthorizedException(`User with id:${authorId} is not author.`);
    }

    const savedBook = await this.bookRepository.save({
      name: book.name,
      description: book.description,
      authors: [author]
    });

    return plainToClass(ReadBookDTO, savedBook);
  }

  async update(id: number, book: Partial<UpdateBookDTO>, authorId: number): Promise<ReadBookDTO> {
    const savedBook = await this.bookRepository.findOne(id, { where: { status: status.ACTIVE } });

    if (!savedBook) {
      throw new NotFoundException('Book not exists');
    }

    const isOwnBook = savedBook.authors.some(({ id }) => id === authorId);

    if (!isOwnBook) {
      throw new UnauthorizedException('This user is not the book author.');
    }

    savedBook.description = book.description;
    savedBook.name = book.name;

    savedBook.save();

    return plainToClass(ReadBookDTO, savedBook);
  }

  async delete(id: number): Promise<void> {
    const book = await this.bookRepository.findOne(id, { where: { status: status.ACTIVE } });

    if(!book){
      throw new NotFoundException('This book not exists');
    }

    book.status = status.INACTIVE;
    book.save();
  }
}