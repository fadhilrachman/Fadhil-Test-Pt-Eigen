import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, BookModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
