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
    if (req.user.role === 'LAWYER') {
      const portfolio = await this.portfolioService.getMyPortfolio(req);

      if (portfolio.id) {
        return await this.caseRepository.save({
          ...createCaseDto,
          portfolio: portfolio.id,
        });
      } else {
        throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Вы не юрист!', HttpStatus.CONFLICT);
    }
  }

  async findAll(req: any) {
    const lawyerId = req.user.userId;
    const portfolio =
      await this.portfolioService.findPortfolioByUserId(lawyerId);
    return await this.caseRepository.find({
      where: { portfolio: portfolio.id },
    });
  }

  async findOne(req: any, id: number) {
    const allCases = await this.findAll(req);
    return allCases.filter((el) => el.id === id)[0];
  }

  async update(req: any, id: number, updateCaseDto: UpdateCaseDto) {
    return await this.caseRepository.save();
  }

  async remove(req: any, id: number) {
    return `This action removes a #${id} case`;
  }
}
