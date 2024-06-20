import { ApiProperty } from '@nestjs/swagger';

export class Member {
  @ApiProperty({ example: 'test' })
  id: string;

  @ApiProperty({ example: 'test' })
  name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 1 })
  bookOnBorrowing: number;

  @ApiProperty({ example: 0 })
  bookReturn: number;
}

export class ResponseMember {
  @ApiProperty({ example: 'Member get successfully' })
  message: string;

  @ApiProperty({ type: [Member] })
  data: Member[];
}
