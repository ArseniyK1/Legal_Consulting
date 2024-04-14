import { Injectable } from '@nestjs/common';
import { CreateTypeRightDto } from './dto/create-type_right.dto';
import { UpdateTypeRightDto } from './dto/update-type_right.dto';

@Injectable()
export class TypeRightService {
  create(createTypeRightDto: CreateTypeRightDto) {
    return 'This action adds a new typeRight';
  }

  findAll() {
    return `This action returns all typeRight`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeRight`;
  }

  update(id: number, updateTypeRightDto: UpdateTypeRightDto) {
    return `This action updates a #${id} typeRight`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeRight`;
  }
}
