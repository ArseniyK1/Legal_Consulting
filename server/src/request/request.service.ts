import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(@Inject('REQUEST_REPOSITORY') private requestRepository) {}

  async createRequest(req: any, dto: CreateRequestDto) {
    if (dto) {
      const request = await this.requestRepository.create({
        ...dto,
        userId: req.user.userId,
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
    return await this.requestRepository.findAll({
      where: { userId: req.user.userId },
    });
  }

  async findOne(id: number) {
    return await this.requestRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  async remove(id: number) {
    return await this.requestRepository.destroy({ where: { id: id } });
  }
}
