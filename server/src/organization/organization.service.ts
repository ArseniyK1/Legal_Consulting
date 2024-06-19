import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Raw, Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { GetAllOrgDto } from './dto/getAllOrg.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION_REPOSITORY')
    private requestRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    return await this.requestRepository.save(createOrganizationDto);
  }

  async findAll(query: GetAllOrgDto) {
    return await this.requestRepository.find({
      where: [
        {
          name: !!query?.name
            ? Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${query?.name}%')`)
            : null,
        },
        {
          name: !!query?.short_name
            ? Raw(
                (alias) =>
                  `LOWER(${alias}) LIKE LOWER('%${query?.short_name}%')`,
              )
            : null,
        },
        {
          name: !!query?.inn
            ? Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${query?.inn}%')`)
            : null,
        },
      ],
    });
  }

  async findOne(id: number) {
    return await this.requestRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return await this.requestRepository.update(
      { id },
      { ...updateOrganizationDto },
    );
  }

  async remove(id: number) {
    const org = await this.requestRepository.findOne({ where: { id: id } });
    return await this.requestRepository.remove(org);
  }
}
