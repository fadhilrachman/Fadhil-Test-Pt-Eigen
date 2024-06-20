import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    console.log({ token });

    if (!token) throw new ForbiddenException('ForbiddenException');
    const finallyToken = token.split(' ')[1];

    const checkUser = await this.databaseService.user.findFirst({
      where: { token: finallyToken },
    });

    console.log({ checkUser });

    if (!checkUser) throw new ForbiddenException('ForbiddenException');
    next();
  }
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    console.log({ token });

    if (!token) throw new ForbiddenException('ForbiddenException');
    const finallyToken = token.split(' ')[1];

    console.log({ finallyToken });

    const checkUser = await this.databaseService.user.findFirst({
      where: { token: finallyToken },
    });
    console.log({ checkUser });

    if (!checkUser || checkUser.role != 'admin')
      throw new ForbiddenException('ForbiddenException');
    next();
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlhdCI6MTcxODkwMDI5NSwiZXhwIjoxNzE5MjQ1ODk1fQ.JW_hBqNHhh9rjhJ8q-iaVDGQNVN70vONuu1FhR1A0Ik
