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
  async findAll() {
    return await this.portfolioService.findAll();
  }

  @Get('getMyPortfolio')
  @ApiOperation({ summary: 'Получение портфолио по id ДЛЯ ЮРИСТОВ' })
  async getMyPortfolio(@Request() req: any) {
    return await this.portfolioService.getMyPortfolio(req);
  }

  @Get('portfolioLawyer/:id')
  @Public()
  @ApiOperation({ summary: 'Получение портфолио для конкретного пользователя' })
  async findPortfolioByUserId(@Param('id') id: string) {
    return await this.portfolioService.findPortfolioByUserId(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление портфолио по id' })
  async remove(@Param('id') id: string) {
    return await this.portfolioService.remove(+id);
  }
}
