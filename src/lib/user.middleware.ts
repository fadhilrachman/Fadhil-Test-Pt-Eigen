import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { errorHandler } from './response';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('ini midlewaree user');

    try {
      const token = req.headers['authorization'];

      if (!token) throw new ForbiddenException('ForbiddenException');
      const finallyToken = token.split(' ')[1];

      const payload = await this.jwtService.verifyAsync(finallyToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      console.log({ payload });

      const checkUser = await this.databaseService.user.findUnique({
        where: { id: payload.i },
      });

      if (!checkUser) throw new ForbiddenException('ForbiddenException');
      next();
    } catch (error) {
      errorHandler({ error, module: 'MIDDLEWARE', status: error.status });
    }
  }
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('ini midlewaree admin');
    try {
      const token = req.headers['authorization'];

      if (!token) throw new ForbiddenException('ForbiddenException');
      const finallyToken = token.split(' ')[1];

      const payload = await this.jwtService.verifyAsync(finallyToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const checkUser = await this.databaseService.user.findUnique({
        where: { id: payload.i },
      });

      if (!checkUser || checkUser.role != 'admin')
        throw new ForbiddenException('ForbiddenException');
      next();
    } catch (error) {
      errorHandler({ error, module: 'MIDDLEWARE', status: error.status });
    }
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlhdCI6MTcxODkwMDI5NSwiZXhwIjoxNzE5MjQ1ODk1fQ.JW_hBqNHhh9rjhJ8q-iaVDGQNVN70vONuu1FhR1A0Ik
