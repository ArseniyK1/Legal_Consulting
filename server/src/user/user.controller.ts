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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';

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

  // @Roles(Role.user)
  @Get()
  @ApiOperation({ summary: 'Показать всех пользователей (для админа)' })
  @Roles(Role.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get('byLogin')
  @ApiOperation({ summary: 'Получение пользователя по логину' })
  @ApiResponse({ type: ByLoginDto })
  findByLogin(@Body() dto: ByLoginDto) {
    return this.userService.findByLogin(dto);
  }

  @Public()
  @ApiOperation({ summary: 'Получение данных о юристе' })
  @Get('getInfoAboutLawyer')
  getInfoAboutLawyer(@Query() query: InfoAboutLawyerDto) {
    return this.userService.getInfoAboutLawyer(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение данных о конкретном пользователе' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление конкретного пользователя' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
