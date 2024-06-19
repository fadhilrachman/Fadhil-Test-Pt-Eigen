import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'test' })
  title: string;

  @ApiProperty({ example: 1 })
  stock: number;

  @ApiProperty({ example: 'test' })
  author: string;
}

export class CreateBorrowingBookDto {
  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  startDate: Date;

  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  dueDate: Date;

  // @ApiProperty({ example: 1 })
  // count: number;
  // @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  // returnDate: Date;

  @ApiProperty({ example: 'test' })
  idBook: string;

  @ApiProperty({ example: 'test' })
  idUser: string;
}

export class ReturnBook {
  @ApiProperty({ example: '2024-06-19T05:00:36.556Z' })
  returnDate: Date;

  // @ApiProperty({ example: 'test' })
  // idBook: string;

  // @ApiProperty({ example: 'test' })
  // idUser: string;
}
