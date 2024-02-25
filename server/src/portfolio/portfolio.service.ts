import { Inject, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository,
  ) {}
  async create(createPortfolioDto: CreatePortfolioDto, userId: any) {
    // return await this.portfolioRepository.create({
    //   education: createPortfolioDto.education,
    //   length_of_service: createPortfolioDto.length_of_service,
    //   retraining: createPortfolioDto.retraining,
    //   userId,
    // });
    console.log(userId.user);
    return userId;
  }

  async findAll() {
    return await this.portfolioRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  async remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
