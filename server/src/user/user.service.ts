import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { genSalt, hash } from 'bcrypt';
import { ByLoginDto } from './dto/by-login.dto';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';
import { Brackets, Repository } from 'typeorm';
import { roleEnum } from '../constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryLawyerDto } from './dto/QueryLawyer.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<any>,
    private roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (!!createUserDto.password && !!createUserDto.login) {
      const existsUser = await this.userRepository.findOne({
        where: { login: createUserDto?.login },
      });
      if (existsUser?.id)
        throw new ConflictException('Такой пользователь уже существует');
      const salt = await genSalt(10); // С помощью библиотеки bycrypt создаём соль
      const hashPassword = await hash(createUserDto.password, salt); // bycrypt создаёт хеш пароля

      if (!!createUserDto.isLawyer) {
        const role = await this.roleService.getRoleByValue(roleEnum.LAWYER);
        return await this.userRepository.save({
          ...createUserDto,
          type_law: createUserDto.type_law,
          roleId: role.id,
          password: hashPassword,
        });
      } else {
        const role = await this.roleService.getRoleByValue(roleEnum.USER);
        return await this.userRepository.save({
          ...createUserDto,
          roleId: role.id,
          password: hashPassword,
        });
      }
    } else {
      throw new BadRequestException('Укажите логин и(или) пароль');
    }
  }

  async createOperator(createUserDto: CreateUserDto) {
    if (!!createUserDto.password && !!createUserDto.login) {
      const existsUser = await this.userRepository.findOne({
        where: { login: createUserDto?.login },
      });
      if (existsUser?.id)
        throw new ConflictException('Такой пользователь уже существует');
      const salt = await genSalt(10); // С помощью библиотеки bycrypt создаём соль
      const hashPassword = await hash(createUserDto.password, salt); // bycrypt создаёт хеш пароля

      const role = await this.roleService.getRoleByValue(roleEnum.OPERATOR);

      return await this.userRepository.save({
        ...createUserDto,
        roleId: role.id,
        password: hashPassword,
      });
    } else {
      throw new BadRequestException('Укажите логин и(или) пароль');
    }
  }

  async updateUserContent(
    userId: number,
    dto: UpdateUserDto,
    photo?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (photo) {
      dto.photo = photo.filename; // сохраняем имя файла в БД
    }
    return this.userRepository.save({
      ...user,
      ...dto,
    });
  }

  async findAll(roleId: number = 1) {
    // если нужны юристы, то
    if (roleId !== 1) {
      const users = await this.userRepository.find({
        where: { roleId: { id: roleId } },
        relations: { roleId: true },
      });
      return users;
    } else {
      return await this.userRepository.find();
    }
  }

  async getAllLawyer(query: QueryLawyerDto) {
    console.log(query);
    const typeLaw = !!query?.type_law ? query?.type_law : null;
    const userName = !!query?.lawyerName ? query?.lawyerName : null;
    let whereCondition = {};

    if (typeLaw) {
      whereCondition = `EXISTS (SELECT 1 FROM jsonb_array_elements_text(type_law) AS j WHERE j ILIKE '%${typeLaw}%')`;
    }

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roleId', 'role')
      .where('user.roleId = :roleId', { roleId: 3 })
      .andWhere(whereCondition)
      .orderBy('user.id', 'DESC');

    if (userName) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.last_name) LIKE LOWER(:name)', {
            name: `%${userName}%`,
          })
            .orWhere('LOWER(user.first_name) LIKE LOWER(:name)', {
              name: `%${userName}%`,
            })
            .orWhere('LOWER(user.middle_name) LIKE LOWER(:name)', {
              name: `%${userName}%`,
            });
        }),
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { roleId: true },
    });
    if (!!user) {
      return user;
    } else {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async getInfoAboutLawyer(query: InfoAboutLawyerDto) {
    if (!!query?.lawyerId) {
      // const user = await this.findOne(+query.lawyerId);
      // if (user.roleId.id === 3) {
      //   const {
      //     first_name,
      //     last_name,
      //     middle_name,
      //     phonenumber,
      //     date_of_birth,
      //     contact_email,
      //   } = user;
      //   const portfolio = await this.portfolioService.findPortfolioByUserId({
      //     lawyerId: user.id,
      //   });
      //   return {
      //     first_name,
      //     last_name: last_name,
      //     middle_name,
      //     phonenumber,
      //     date_of_birth,
      //     contact_email,
      //     portfolio,
      //   };
      // } else {
      //   throw new HttpException(
      //     'Этот пользователь не является юристом!',
      //     HttpStatus.CONFLICT,
      //   );
      // }
    } else {
      throw new HttpException('Укажите id юриста', HttpStatus.BAD_REQUEST);
    }
  }

  async findByLogin(query: ByLoginDto) {
    const user = await this.userRepository.findOne({
      where: { login: query.login },
      relations: { roleId: true },
    });
    if (!user.id) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(_id: number) {
    const existsUser = await this.userRepository.exists({ where: { id: _id } });
    if (existsUser) {
      const userToRemove = await this.userRepository.findOneBy({
        id: _id,
      });
      await this.userRepository.remove(userToRemove);
      return `Пользователь с id ${_id} успешно удален`;
    } else {
      throw new NotFoundException('Такого пользователя не существует');
    }
  }
}
