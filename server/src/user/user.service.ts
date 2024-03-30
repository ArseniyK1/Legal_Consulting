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
import { compare, genSalt, hash } from 'bcrypt';
import { ByLoginDto } from './dto/by-login.dto';
import { PortfolioService } from '../portfolio/portfolio.service';
import { InfoAboutLawyerDto } from './dto/InfoAboutLawyer.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}
  // private rolesRepository,
  // @Inject('ROLES_REPOSITORY')
  // private portfolioService: PortfolioService,
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
        const role = await this.roleService.getRoleByValue('LAWYER');
        console.log(role);
        return await this.userRepository.save({
          ...createUserDto,
          roleId: role.id,
          password: hashPassword,
        });
      } else {
        const role = await this.roleService.getRoleByValue('USER');
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

  async findAll(roleId: number = 1) {
    // if (roleId !== 1) {
    //   return await this.userRepository.findAll({
    //     where: { roleId },
    //   });
    // } else {
    //   return await this.userRepository.findAll();
    // }

    return await this.userRepository.find({ relations: { roleId: true } });
  }

  async getAllLawyer() {
    return await this.findAll(3);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
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
      // if (user.roleId === 3) {
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
    // Метод проверки пользователя по имени и паролю
    const user = await this.userRepository.findOne({
      where: { login: query.login },
    });

    if (!user.id) {
      // Если пользователя нет, выводим ошибку 'User not found'
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async remove(_id: number) {
    const existsUser = await this.userRepository.findOne({
      where: { id: _id },
    });
    // if (existsUser?.id) {
    //   await this.userRepository.destroy({ where: { id: _id } });
    //   return `Пользователь с id ${_id} успешно удален`;
    // } else {
    //   throw new NotFoundException('Такого пользователя не существует');
    // }
  }
}
