import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';
import { Public } from './auth/public.decorator';

@Controller('app')
export class AppController {
  @Get()
  @Public()
  findAll() {
    return 'hello world';
  }
}
