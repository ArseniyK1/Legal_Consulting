import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req) {
    return this.portfolioService.create(req);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(+id);
  }
}
