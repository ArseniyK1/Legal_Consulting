import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { Role, Roles } from '../roles/decorators/roles.decorator';
import { ByLoginDto } from './dto/by-login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';
import { GetInfoAboutLawyerDto } from './dto/getInfoAboutLawyer.dto';
import { FindOneUserDto } from './dto/FindOneUser.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Показать всех пользователей (для админа)' })
  @ApiResponse({ type: [CreateUserDto] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('allLawyer')
  @ApiOperation({ summary: 'Показать всех юристов' })
  @Public()
  @ApiResponse({ type: [CreateUserDto] })
  getAllLawyer() {
    return this.userService.getAllLawyer();
  }

  @Get('byLogin')
  @ApiOperation({ summary: 'Получение пользователя по логину' })
  @ApiResponse({ type: CreateUserDto })
  findByLogin(@Query() query: ByLoginDto) {
    return this.userService.findByLogin(query);
  }

  @Public()
  @ApiOperation({ summary: 'Получение данных о юристе' })
  @ApiResponse({ type: GetInfoAboutLawyerDto })
  @Get('getInfoAboutLawyer')
  getInfoAboutLawyer(@Query() query: InfoAboutLawyerDto) {
    return this.userService.getInfoAboutLawyer(query);
  }

  @Get('byId')
  @ApiOperation({ summary: 'Получение данных о конкретном пользователе' })
  findOne(@Query() query: FindOneUserDto) {
    return this.userService.findOne(+query._id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление конкретного пользователя' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
