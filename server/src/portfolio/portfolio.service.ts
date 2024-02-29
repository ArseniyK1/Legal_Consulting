import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository,
    private userService: UserService,
  ) {}
  async create(req: any, dto: CreatePortfolioDto) {
    const existsPortfolio = await this.portfolioRepository.findOne({
      where: { userId: req.user.userId },
    });
    if (!!existsPortfolio)
      throw new HttpException(
        'У вас уже есть портфолио!',
        HttpStatus.BAD_REQUEST,
      );
    return await this.portfolioRepository.create({
      education: dto.education,
      length_of_service: dto.length_of_service,
      retraining: dto.retraining,
      userId: req.user.userId,
    });
  }

  async findAll() {
    return await this.portfolioRepository.findAll();
  }

  async findOne(_id: number, req?: any) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: _id },
    });
    if (portfolio?.id && req.user.userId) {
      const user = await this.userService.findOne(req.user.userId);
      return { portfolio, user };
    } else {
      throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
    }
  }

  async findPortfolioByUserId(req: any) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId: req.user.userId },
    });

    if (!!portfolio) {
      return portfolio;
    } else {
      throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  async remove(_id: number) {
    // const existsPortfolio = await this.findOne(_id);
    // console.log(existsPortfolio);
    // if (!!existsPortfolio?.portfolio?.id)
    //   throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
    return await this.portfolioRepository.destroy({ where: { id: _id } });
  }
}
