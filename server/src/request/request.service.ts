import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { IsNull, Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { requestStatusEnum } from '../constants';
import { ChangeStatusDto } from './dto/change-status.dto';
import { tr } from '@faker-js/faker';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @Inject('REQUEST_REPOSITORY')
    private requestRepository: Repository<any>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async createRequest(req: any, dto: CreateRequestDto) {
    if (dto) {
      const request = await this.requestRepository.save({
        ...dto,
        type_right: dto.type_right,
        status: requestStatusEnum.PENDING,
        user: req.user.userId,
      }); // Если из списка предлагаемых типов проблем не нашлось нужной, пользователь выбирате "прочее" и описывает свою проблему

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
    return await this.requestRepository.find({
      relations: { type_right: true },
    });
  }

  async findAllRequests() {
    const req = await this.requestRepository.find({
      relations: { type_right: true },
    });
    console.log(req);
    return req;
  }

  async getMyRequest(req: any) {
    const requests = await this.requestRepository.find({
      where: { user: { id: req.user.userId } },
      relations: { type_right: true, user: true },
    });

    const requestsWithLawyers = await Promise.all(
      requests.map(async (request) => {
        if (request.lawyerId) {
          const lawyer = await this.userRepository.findOne({
            where: { id: request.lawyerId },
          });
          return { ...request, lawyer };
        }
        return request;
      }),
    );

    return requestsWithLawyers;
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

  async changeStatus(dto: ChangeStatusDto) {
    // const portfolio = await this.findOne(requestId);
    // if (!portfolio?.id)
    //   throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    // return await portfolio.update(dto);
    const request = await this.requestRepository.findOne({
      where: { id: dto.requestId },
    });
    return await this.requestRepository.save({
      ...request,
      lawyerId: dto.lawyerId,
      status: dto.status,
    });
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
