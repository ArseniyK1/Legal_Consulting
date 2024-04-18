import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeRightDto } from './dto/create-type_right.dto';
import { UpdateTypeRightDto } from './dto/update-type_right.dto';
import { Repository } from 'typeorm';
import { TypeRight } from './entities/type_right.entity';

@Injectable()
export class TypeRightService {
  constructor(
    @Inject('TYPE_RIGHT_REPOSITORY')
    private typeRightRepository: Repository<any>,
  ) {}
  async createTypeRight(dto: CreateTypeRightDto) {
    // return await this.typeRightRepository.save({
    //   ...dto,
    //   type_trouble: JSON.stringify(dto.type_trouble),
    // });
    return await this.typeRightRepository.save(dto);
  }

  async getAllTypeRights() {
    return await this.typeRightRepository.find();
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
