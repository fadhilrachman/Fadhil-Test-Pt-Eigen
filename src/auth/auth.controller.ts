import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { errorHandler } from 'src/lib/response';
import {
  LoginResponse,
  RegisterDuplicateResponse,
  RegisterResponse,
  EmailPasswordWrongResponse,
} from './entities/auth.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginResponse, status: 200 })
  @ApiResponse({ type: EmailPasswordWrongResponse, status: 401 })
  async login(@Body() createAuthDto: LoginDto) {
    try {
      const result = await this.authService.login(createAuthDto);
      return {
        message: 'Login successfuly',
        token: result,
      };
    } catch (error) {
      errorHandler({
        module: 'AUTH/LOGIN(POST)',
        error,
        status: error.status,
      });
    }
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: RegisterResponse, status: 200 })
  @ApiResponse({ type: RegisterDuplicateResponse, status: 400 })
  async register(@Body() createAuthDto: RegisterDto) {
    try {
      const result = await this.authService.register(createAuthDto);
      return {
        message: 'Register successfully',
        data: result,
      };
    } catch (error) {
      errorHandler({
        module: 'AUTH/REGISTER(POST)',
        error,
        status: error.status,
      });
    }
  }
}
