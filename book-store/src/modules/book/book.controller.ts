import { Controller, Param, ParseIntPipe, Get, UseGuards, Body, Post, Patch, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/roleType.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { CreateBookDTO, UpdateBookDTO } from './dto';
import { ExtractUser } from '../auth/extractUser.decorator';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService
  ) { }

  @Get(':id')
  getBook(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.bookService.get(id);
  }

  @Get('author/:authorId')
  getBooksByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number
  ) {
    return this.bookService.getBooksByAuthor(authorId);
  }

  @Get()
  getBooks() {
    return this.bookService.getAll();
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(
    @Body() book: Partial<CreateBookDTO>
  ) {
    return this.bookService.create(book);
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBookByAuthor(
    @Body() book: Partial<CreateBookDTO>,
    @ExtractUser('id') authorId: number
  ) {
    return this.bookService.createByAuthor(book, authorId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateBook(
    @Body() book: Partial<UpdateBookDTO>,
    @Param('id', ParseIntPipe) id: number,
    @ExtractUser('id') authorId: number
  ) {
    return this.bookService.update(id, book, authorId);
  }

  @Delete(':id')
  deleteBook(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.bookService.delete(id);
  }

}
