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

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository,
    private roleService: RolesService,
    @Inject('USER_ROLES_REPOSITORY')
    private userRolesRepository,
    @Inject('ROLES_REPOSITORY')
    private rolesRepository,
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

      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });

      if (!!createUserDto.isLawyer) {
        const role = await this.roleService.getRoleByValue('LAWYER');
        await user.$set('roles', [role.id]);
      } else {
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
      }

      const role = await this.getRoleByUser(user.id);

      return { user, role };
    } else {
      throw new BadRequestException('Укажите логин и(или) пароль');
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!!user) {
      const role = await this.getRoleByUser(user.id);
      return { user, role };
    } else {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  async findByLogin(dto: ByLoginDto) {
    // Метод проверки пользователя по имени и паролю
    const user = await this.userRepository.findOne({
      where: { login: dto.username },
    });

    if (!user.id) {
      // Если пользователя нет, выводим ошибку 'User not found'
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(dto.password, user.password); // С помощью библиотеки bcrypt вставляем оригинальный пароль и хеш; если они равны, то вернётся true
    if (!areEqual) {
      // Если пароли не равны, то выводим ошибку 'Invalid credentials'
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async remove(_id: number) {
    const existsUser = await this.userRepository.findOne({
      where: { id: _id },
    });
    if (existsUser?.id) {
      await this.userRepository.destroy({ where: { id: _id } });
      return `Пользователь с id ${_id} успешно удален`;
    } else {
      throw new NotFoundException('Такого пользователя не существует');
    }
  }

  async getRoleByUser(userId: number) {
    const rolesUser = await this.userRolesRepository.findOne({
      where: { userId: userId },
    });
    return await this.rolesRepository.findOne({
      where: { id: rolesUser.roleId },
    });
  }
}
