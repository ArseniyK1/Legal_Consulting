import { Injectable } from '@nestjs/common';
import { CreateTroubleDto } from './dto/create-trouble.dto';
import { UpdateTroubleDto } from './dto/update-trouble.dto';

@Injectable()
export class TroubleService {
  create(createTroubleDto: CreateTroubleDto) {
    return 'This action adds a new trouble';
  }

  findAll() {
    return `This action returns all trouble`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trouble`;
  }

  update(id: number, updateTroubleDto: UpdateTroubleDto) {
    return `This action updates a #${id} trouble`;
  }

  remove(id: number) {
    return `This action removes a #${id} trouble`;
  }
}
