import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @Inject('PORTFOLIO_REPOSITORY')
    private portfolioRepository,
    @Inject('USER_REPOSITORY')
    private userRepository,
    @Inject('ROLES_REPOSITORY')
    private rolesRepository,
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

  async findOne(req: any) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId: req.user.userId },
    });
    if (!!req.user.userId) {
      if (req.user.userId === portfolio?.userId) {
        return { user: req.user, portfolio };
      } else {
        throw new HttpException('Портфолио не найдено!', HttpStatus.NOT_FOUND);
      }
    }
  }

  async findPortfolioByUserId(query: Record<string, object>) {
    const lawyer = await this.userRepository.findOne({
      where: { id: +query.lawyerId },
    });
    if (!lawyer?.id)
      throw new HttpException(
        'Данный пользователь не найден!',
        HttpStatus.NOT_FOUND,
      );
    if (lawyer.roleId !== 3)
      throw new HttpException(
        'Данный пользователь не является юристом!',
        HttpStatus.BAD_REQUEST,
      );
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId: lawyer.id },
    });
    if (!portfolio?.id)
      throw new HttpException(
        'У этого юриста пока нет портфолио!',
        HttpStatus.NOT_FOUND,
      );
    return portfolio;
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
