import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from './member/member.module';
import { AdminMiddleware, UserMiddleware } from './lib/user.middleware';

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
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes(
        { path: 'book', method: RequestMethod.GET },
        { path: 'book', method: RequestMethod.PATCH },
      );

    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: 'member', method: RequestMethod.GET },
        { path: 'book', method: RequestMethod.POST },
        { path: 'book', method: RequestMethod.PUT },
        { path: 'book', method: RequestMethod.DELETE },
      );
  }
}
