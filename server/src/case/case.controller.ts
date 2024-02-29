import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('case')
@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  @ApiOperation({ summary: 'Добавление дел(а) в портфолио' })
  create(@Request() req: any, @Body() createCaseDto: CreateCaseDto) {
    return this.caseService.create(req, createCaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех дел из портфолио пользователя' })
  findAll(@Request() req: any) {
    return this.caseService.findAll(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного дела из портфолио пользователя' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.caseService.findOne(req, +id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Изменение одного дела в портфолио пользователя' })
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateCaseDto: UpdateCaseDto,
  ) {
    return this.caseService.update(req, +id, updateCaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление одного дела из портфолио пользователя' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.caseService.remove(req, +id);
  }
}
