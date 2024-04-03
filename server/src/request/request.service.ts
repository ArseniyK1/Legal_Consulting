import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { IsNull, Repository } from 'typeorm';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_REPOSITORY')
    private requestRepository: Repository<Request>,
  ) {}

  async createRequest(req: any, dto: CreateRequestDto) {
    if (dto) {
      const request = await this.requestRepository.save({
        ...dto,
        status: 'Открытая',
        user: req.user.userId,
      });

      return request;
    } else {
      throw new HttpException(
        'Вы не указали данные для заявки!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllRequestByUser(req: any) {
    // return await this.requestRepository.find({
    //   where: { userId: req.user.userId },
    // });
    return await this.requestRepository.find();
  }

  async getOpenRequestByLawyer() {
    return await this.requestRepository.find({
      where: { lawyerId: IsNull() },
    });
  }

  async findOne(id: number) {
    return await this.requestRepository.findOne({
      where: { id: id },
    });
  }

  async update(requestId: number, dto: UpdateRequestDto) {
    const portfolio = await this.findOne(requestId);
    if (!portfolio?.id)
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    // return await portfolio.update(dto);
    return 'sadasd';
  }

  async respondRequest(lawyerId: number, requestId: number) {
    const request = await this.requestRepository.findOne({
      where: { id: requestId },
    });
    return await this.requestRepository.save({
      ...request,
      lawyerId,
      status: 'Выполняется',
    });
  }

  async remove(id: number) {
    // return await this.requestRepository.destroy({ where: { id: id } });
    return 'dsadasd';
  }
}
