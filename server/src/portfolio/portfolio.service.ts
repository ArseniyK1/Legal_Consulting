import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

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
      where: { user: req.user.userId },
      relations: { user: true },
    });
    if (existsPortfolio === false)
      throw new HttpException(
        'У вас уже есть портфолио!',
        HttpStatus.BAD_REQUEST,
      );
    return await this.portfolioRepository.save({
      education: dto.education,
      length_of_service: dto.length_of_service,
      retraining: dto.retraining,
      user: req.user.userId,
    });
  }

  async findAll() {
    return await this.portfolioRepository.find({ relations: { user: true } });
  }

  async getMyPortfolio(req: any) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { user: { id: req.user.userId } },
    });
    if (!portfolio?.id) throw new NotFoundException('Портфолио не найдено!');

    return portfolio;
  }

  async findPortfolioByUserId(lawyerId: number) {
    const lawyer = await this.userRepository.findOne({
      where: { id: lawyerId, roleId: { id: 3 } },
      relations: { roleId: true },
    });
    if (!lawyer?.id)
      throw new HttpException(
        'Данный пользователь не найден или не является юристом!',
        HttpStatus.NOT_FOUND,
      );
    const portfolio = await this.portfolioRepository.findOne({
      where: { user: { id: lawyer.id } },
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
    const existsPortfolio = await this.portfolioRepository.findOne({
      where: { id: _id },
    });
    return await this.portfolioRepository.remove(existsPortfolio);
  }
}
