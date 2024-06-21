import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateBookDto,
  CreateBorrowingBookDto,
  ReturnBook,
} from './dto/create-book.dto';
import { DatabaseService } from 'src/database/database.service';
import * as moment from 'moment';
@Injectable()
export class BookService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(body: CreateBookDto) {
    const count = await this.databaseService.book.count();

    // BUILD CODE FORMAT
    const code = `${body.title
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 2)
      .toUpperCase()}-${count + 1}`;

    const result = await this.databaseService.book.create({
      data: { ...body, borrowingCount: 0, code },
    });
    return result;
  }

  findAll() {
    return this.databaseService.book.findMany({ where: { deletedAt: null } });
  }

  async findOne(id: string) {
    const result = await this.databaseService.book.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException('Book not found');
    return result;
  }

  async update(id: string, updateBookDto: CreateBookDto) {
    const result = await this.databaseService.book.update({
      where: { id },
      data: updateBookDto,
    });
    if (!result) throw new NotFoundException('Book not found');
    return result;
  }

  async remove(id: string) {
    const check = await this.databaseService.book.findUnique({ where: { id } });
    if (!check) throw new NotFoundException('Book not found');

    const result = await this.databaseService.book.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return result;
  }

  // BORROWING
  async borrowingBook(body: CreateBorrowingBookDto) {
    const { dueDate, idBook, startDate, idUser } = body;

    // VALIDATION IF MEMBER ALREADY BORROWED 2 BOOKS
    const checkMaxBorrowingMember =
      await this.databaseService.borowingBook.count({
        where: { idUser, returnDate: null, deletedAt: null },
      });

    if (checkMaxBorrowingMember >= 2)
      throw new BadRequestException('Max borrow requests book');

    const due = await this.databaseService.borowingBook.findMany({
      where: {
        idUser,
      },
    });
    // moment().
    const today = moment();

    const checkIfBookNotReturn = due.map((val) => {
      const dueDate = moment(val.dueDate);
      return val.returnDate ? false : dueDate.isBefore(today);
    });

    const checkIfUseStill3DaysBan = due.map((val) => {
      const dueDate = moment(val.dueDate);
      const returnDate = moment(val.returnDate);

      if (!val.returnDate) return false;

      if (returnDate.diff(dueDate, 'days') > 7) {
        return today.diff(returnDate, 'days') < 4 ? true : false;
      }
      return false;
    });

    if (
      checkIfBookNotReturn.includes(true) ||
      checkIfUseStill3DaysBan.includes(true)
    )
      throw new BadRequestException('You are still banned');

    // if(checkIfBookNotReturn.includes(false))

    // VALIDATION IF BOOK NOT FOUND
    const dataBook = await this.databaseService.book.findUnique({
      where: { id: idBook },
    });

    if (!dataBook) throw new NotFoundException('Book not found');

    // VALIDATION IF STOCK NOT AVAILABLE
    const count = 1;
    if (dataBook.borrowingCount + count > dataBook.stock)
      throw new BadRequestException('Stock not available');

    const [result, updateBookStock] = await this.databaseService.$transaction([
      this.databaseService.borowingBook.create({
        data: {
          dueDate,
          startDate,
          idBook,
          idUser,
        },
      }),
      this.databaseService.book.update({
        where: { id: idBook },
        data: {
          borrowingCount: dataBook.borrowingCount + count,
        },
      }),
    ]);

    return result;
  }

  async returnBook(id: string, body: ReturnBook) {
    const { returnDate } = body;

    // VALIDATION IF STOCK NOT AVAILABLE
    const dataDetail = await this.databaseService.borowingBook.findUnique({
      where: { id },
      include: {
        book: true,
      },
    });
    console.log({ dataDetail });

    // dataDetail.
    if (!dataDetail) throw new NotFoundException('Borrowind not found');

    if (dataDetail.returnDate)
      throw new BadRequestException('Book already returned');

    const [result] = await this.databaseService.$transaction([
      this.databaseService.borowingBook.update({
        where: { id },
        data: {
          returnDate,
        },
      }),
      this.databaseService.book.update({
        where: { id: dataDetail.idBook },
        data: { borrowingCount: dataDetail.book.borrowingCount - 1 },
      }),
    ]);

    return result;
  }

  async bookBorrowingHistory() {
    const result = await this.databaseService.borowingBook.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        book: { select: { id: true, title: true, code: true } },
      },
    });

    return result;
  }
}
