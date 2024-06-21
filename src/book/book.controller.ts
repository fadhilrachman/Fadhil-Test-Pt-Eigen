import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  CreateBookDto,
  CreateBorrowingBookDto,
  ReturnBook,
} from './dto/create-book.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { errorHandler, succesResponseFindList } from 'src/lib/response';
import {
  ReponseAlreadyReturnedBook,
  ReponseMaxBorrowing,
  ReponseNotFound,
  ReponseStockNotAvailable,
  ReponseUserStillBan,
  ResponseBook,
  ResponseOneBook,
  ResponseSavedBook,
} from './entities/book.entity';

@ApiTags('Book')
@ApiBearerAuth('access-token')
@ApiExtraModels(
  ReponseUserStillBan,
  ReponseStockNotAvailable,
  ReponseMaxBorrowing,
)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // GET DATA BUKU
  @Get()
  @ApiResponse({
    status: 200,
    type: ResponseBook,
  })
  async findAll() {
    try {
      const result = await this.bookService.findAll();
      return {
        message: 'Succes get book',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK(DELETE)',
      });
    }
  }

  // CREATE DATA BUKU
  @Post()
  // @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 201,
    type: ResponseSavedBook,
  })
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      const result = await this.bookService.create(createBookDto);
      return {
        message: 'Book saved successfully',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK(DELETE)',
      });
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ResponseOneBook,
  })
  @ApiResponse({
    status: 404,
    type: ReponseNotFound,
  })
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.bookService.findOne(id);
      return {
        message: 'Book get successfully',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK(DELETE)',
      });
    }
  }

  // UPDATE BOOK
  @Put(':id')
  @ApiBody({
    type: CreateBookDto,
  })
  @ApiResponse({
    status: 201,
    type: ResponseSavedBook,
  })
  @ApiResponse({
    status: 404,
    type: ReponseNotFound,
  })
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    try {
      const result = await this.bookService.update(id, updateBookDto);
      return {
        message: 'Book saved successfully',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK(DELETE)',
      });
    }
  }

  // DELETE BOOK
  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: ResponseSavedBook,
  })
  @ApiResponse({
    status: 404,
    type: ReponseNotFound,
  })
  async remove(@Param('id') id: string) {
    try {
      const result = await this.bookService.remove(id);
      return {
        message: 'Book deleted successfully',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK(DELETE)',
      });
    }
  }

  @Patch('/return/:id')
  @ApiResponse({
    status: 404,
    type: ReponseNotFound,
  })
  @ApiResponse({
    status: 400,
    type: ReponseAlreadyReturnedBook,
  })
  async bookReturn(@Param('id') id: string, @Body() updateBookDto: ReturnBook) {
    try {
      const result = await this.bookService.returnBook(id, updateBookDto);
      return {
        message: 'Book returned successfully',
        result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK/RETURN(PATCH)',
      });
    }
  }

  @Patch('/borrowing')
  @ApiBody({ type: CreateBorrowingBookDto })
  @ApiResponse({
    status: 404,
    type: ReponseNotFound,
  })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: refs(
        ReponseUserStillBan,
        ReponseStockNotAvailable,
        ReponseMaxBorrowing,
      ),
    },
  })
  async bookBorrowing(@Body() body: CreateBorrowingBookDto) {
    try {
      const result = await this.bookService.borrowingBook(body);
      return {
        message: 'Book borrowing successfully',
        result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK/BORROWING(PATCH)',
      });
    }
  }

  @Get('/borrowing/history')
  async getKontol() {
    try {
      const result = await this.bookService.bookBorrowingHistory();

      return {
        message: 'Book borrowing get successfully',
        result,
      };
    } catch (error) {
      return errorHandler({
        error,
        status: error.status,
        module: 'BOOK/BORROWING/HISTORY(GET)',
      });
    }
  }
}
