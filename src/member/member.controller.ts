import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { errorHandler } from 'src/lib/response';
import { ResponseMember } from './entities/member.entity';

@ApiTags('Member')
@ApiBearerAuth('access-token')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiResponse({ type: ResponseMember })
  async findAll() {
    try {
      const result = await this.memberService.findAllMember();
      return {
        message: 'Member get successfully',
        data: result,
      };
    } catch (error) {
      return errorHandler({
        error,
        module: 'MEMBER(GET)',
        status: error.status,
      });
    }
  }
}
