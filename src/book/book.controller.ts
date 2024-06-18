import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { errorHandler, succesResponseFindList } from 'src/lib/response';
import { Book } from '@prisma/client';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // GET DATA BUKU
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All data list',
    // content:
    // schema

    // data:Book[],
  })
  async findAll() {
    try {
      const result = await this.bookService.findAll();

      return {
        data: result,
        message: 'Succes get book',
      };
    } catch (error) {
      return errorHandler({ message: error.message, status: error.status });
    }
  }

  // CREATE DATA BUKU
  @Post()
  // @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        author: {
          type: 'string',
          title: 'Book Author ',
          example: 'test',
          description: 'this is a book author',
        },
        title: {
          title: 'Book Title ',
          type: 'string',
          example: 'test',
          description: 'this is a book title',
        },
        stok: {
          title: 'Book Stock ',
          type: 'integer',
          example: 1,
          description: 'this is a book stock',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        author: {
          type: 'string',
          title: 'Book Author ',
          example: 'test',
          description: 'this is a book author',
        },
        title: {
          title: 'Book Title ',
          type: 'string',
          example: 'test',
          description: 'this is a book title',
        },
        stok: {
          title: 'Book Stock ',
          type: 'integer',
          example: 1,
          description: 'this is a book stock',
        },
      },
    },
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  @Patch('/return/:id')
  bookReturn(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Patch('/borrowing-history')
  bookBorrowingHistory(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }
  @Patch('/borrowing/:id')
  bookBorrowing(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
}
