import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    BookModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'asdasdasdasdasdasdasdasdasd',
      signOptions: { expiresIn: '4d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
