import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class CaseService {
  constructor(
    @Inject('CASE_REPOSITORY') private caseRepository,
    private portfolioService: PortfolioService,
  ) {}

  async create(req: any, createCaseDto: CreateCaseDto) {
    const { id } = await this.portfolioService.findPortfolioByUserId(req);
    if (id) {
      return await this.caseRepository.create({
        ...createCaseDto,
        portfolioId: id,
      });
    } else {
      throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(req: any) {
    const { id } = await this.portfolioService.findPortfolioByUserId(req);

    if (id) {
      const cases = await this.caseRepository.findAll({
        where: { portfolioId: id },
      });
      return cases.length ? cases : [];
    } else {
      throw new HttpException('Дел не найдено!', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(req: any, id: number) {
    return `This action returns a #${id} case`;
  }

  async update(req: any, id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  async remove(req: any, id: number) {
    return `This action removes a #${id} case`;
  }
}
