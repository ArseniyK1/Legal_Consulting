import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @ApiOperation({ summary: 'Создание портфолио' })
  async create(@Request() req: any, @Body() dto: CreatePortfolioDto) {
    return await this.portfolioService.create(req, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех портфолио' })
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get('getMyPortfolio')
  @ApiOperation({ summary: 'Получение портфолио по id ДЛЯ ЮРИСТОВ' })
  findOne(@Request() req: any) {
    return this.portfolioService.findOne(req);
  }

  @Get('portfolioLawyer')
  @Public()
  @ApiOperation({ summary: 'Получение портфолио для конкретного пользователя' })
  findPortfolioByUserId(@Query() query: Record<string, object>) {
    return this.portfolioService.findPortfolioByUserId(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление портфолио по id' })
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(+id);
  }
}
