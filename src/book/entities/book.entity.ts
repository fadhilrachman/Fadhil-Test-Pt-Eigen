import { ApiProperty } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ example: '04a8186b-29b7-45ee-8e2e-7c65251e03de' })
  id: string;

  @ApiProperty({ example: 'test' })
  title: string;

  @ApiProperty({ example: 1 })
  stock: number;

  @ApiProperty({ example: 1 })
  borrowingBook: number;

  @ApiProperty({ example: 'test' })
  author: string;

  @ApiProperty({ example: 'TE-1' })
  code: string;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  updateAt: string;

  @ApiProperty({ example: null })
  deletedAt: string;
}

export class ResponseBook {
  @ApiProperty({ example: 'Book get successfully' })
  message: string;

  @ApiProperty({ type: [Book] })
  data: Book[];
}
export class ResponseOneBook {
  @ApiProperty({ example: 'Book get successfully' })
  message: string;

  @ApiProperty({ type: Book })
  data: Book;
}

export class ResponseSavedBook {
  @ApiProperty({ example: 'Book saved successfully' })
  message: string;

  @ApiProperty({ type: Book })
  data: Book;
}

export class ReponseNotFound {
  @ApiProperty({ example: 'Data not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 404 })
  status: number;
}

export class ReponseAlreadyReturnedBook {
  @ApiProperty({ example: 'Book already returned' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  status: number;
}

export class ReponseUserStillBan {
  @ApiProperty({ example: 'You are still banned' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  status: number;
}

export class ReponseStockNotAvailable {
  @ApiProperty({ example: 'Stock not available' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  status: number;
}

export class ReponseMaxBorrowing {
  @ApiProperty({ example: 'Max borrow requests boo' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  status: number;
}
