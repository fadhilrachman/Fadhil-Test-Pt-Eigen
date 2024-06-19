import { ApiProperty } from '@nestjs/swagger';
import { RegisterDto } from '../dto/create-auth.dto';

export class Auth {}

export class RegisterResponse {
  @ApiProperty({ example: 'Register successfully' })
  message: string;

  @ApiProperty({ type: RegisterDto })
  data: RegisterDto;
}

export class RegisterDuplicateResponse {
  @ApiProperty({ example: 'User already registered' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  status: number;
}

export class LoginResponse {
  @ApiProperty({ example: 'Login successfuly' })
  message: string;

  @ApiProperty({ example: 'token' })
  token: string;
}

export class EmailPasswordWrongResponse {
  @ApiProperty({ example: 'Email or password incorrect' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  status: number;
}

//   export class UnauthorizedResponse {
//     @ApiProperty({ example: 'Login successfuly' })
//     message: string;

//     @ApiProperty({ example: 'token' })
//     token: string;
//   }
