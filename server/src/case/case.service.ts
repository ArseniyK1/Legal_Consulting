import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { roleEnum } from '../constants';

@Injectable()
export class CaseService {
  constructor(
    @Inject('CASE_REPOSITORY') private caseRepository,
    @Inject('USER_REPOSITORY') private userRepository,
  ) {}

  async create(req: any, createCaseDto: CreateCaseDto) {
    if (req.user.role === roleEnum.LAWYER) {
      return await this.caseRepository.save({
        issue: createCaseDto.issue,
        description: createCaseDto.description,
        article: createCaseDto.article,
        number: createCaseDto.number,
        user: req.user.userId,
      });
    } else {
      throw new HttpException('Вы не юрист!', HttpStatus.CONFLICT);
    }
  }

  async findAll(req: any) {
    return await this.caseRepository.find({
      relations: { user: true },
      order: { id: 'DESC' },
    });
  }
  //
  async findOne(req: any, id: number) {
    return await this.caseRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async getCasesByLawyer(req: any, id: number) {
    return await this.caseRepository.find({
      where: { user: { id } },
      relations: { user: true },
    });
  }

  async getMyCases(req: any) {
    return await this.caseRepository.find({
      where: { user: { id: req.user.userId } },
      relations: { user: true },
    });
  }

  async update(req: any, id: number, updateCaseDto: UpdateCaseDto) {
    // return await this.caseRepository.update(id, updateCaseDto);
  }

  async remove(req: any, id: number) {
    return await this.caseRepository.delete(id);
  }
}
