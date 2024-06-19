import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(createAuthDto: LoginDto) {
    const { email, password } = createAuthDto;

    const checkUser = await this.databaseService.user.findFirst({
      where: { email },
    });
    if (!checkUser)
      throw new UnauthorizedException('Email or password incorrect');

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    // VALIDATION IF WRONG PASSWORD
    if (!checkPassword)
      throw new UnauthorizedException('Email or password incorrect');

    const token = await this.jwtService.signAsync({ name: checkUser.name });

    await this.databaseService.user.update({
      where: { id: checkUser.id },
      data: { token },
    });
    return token;
  }

  async register(createAuthDto: RegisterDto) {
    const { email, name, password, role = 'member' } = createAuthDto;

    const emailDuplicateCheck = await this.databaseService.user.findFirst({
      where: { email },
    });

    if (emailDuplicateCheck)
      throw new BadRequestException('User already registered');

    // PASSWORD HASH
    const saltRounds = 10;
    const finallyPasword = await bcrypt.hash(password, saltRounds);

    // BUILD CODE FORMAT
    const count = await this.databaseService.user.count();
    const code = `${name
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 2)
      .toUpperCase()}-${count + 1}`;

    const result = await this.databaseService.user.create({
      data: {
        name,
        email,
        password: finallyPasword,
        role,
        code,
      },
    });
    return result;
  }
}
