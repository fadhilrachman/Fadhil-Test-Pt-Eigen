import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MemberService {
  constructor(private readonly dataService: DatabaseService) {}

  async findAllMember() {
    const result = await this.dataService.user.findMany({
      where: {
        role: 'member',
      },
      select: {
        id: true,
        name: true,
        email: true,
        borowingBook: true,
      },
    });

    // BUILD FINALLY RESPONSE
    const finallyResult = result.map((res) => {
      const { borowingBook, id, name, email } = res;
      const booksWithReturnDateNull = borowingBook.filter(
        (book) => book.returnDate === null,
      );
      const booksWithReturnDateNotNull = borowingBook.filter(
        (book) => book.returnDate !== null,
      );

      return {
        id,
        name,
        email,
        bookOnBorrowing: booksWithReturnDateNull.length,
        bookReturn: booksWithReturnDateNotNull.length,
      };
    });

    return finallyResult;
  }
}
