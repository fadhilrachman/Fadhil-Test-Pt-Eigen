import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(body: CreateBookDto) {
    return this.databaseService.book.create({ data: body });
  }

  findAll() {
    return this.databaseService.book.findMany();
  }

  findOne(id: string) {
    return this.databaseService.book.findUnique({ where: { id } });
  }

  update(id: string, updateBookDto: CreateBookDto) {
    return this.databaseService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  remove(id: string) {
    return this.databaseService.book.delete({ where: { id } });
  }
}
