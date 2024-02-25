import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';
import { RolesService } from '../roles/roles.service';

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
    const existsUser = await this.userRepository.findOne({
      where: { login: createUserDto?.login },
    });
    if (existsUser?.id)
      throw new ConflictException('Такой пользователь уже существует');
    if (!!createUserDto.password && !!createUserDto.login) {
      const user = await this.userRepository.create(createUserDto);
      if (!!createUserDto.isLawyer) {
        const role = await this.roleService.getRoleByValue('LAWYER');
        await user.$set('roles', [role.id]);
      } else {
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
      }

      const rolesUser = await this.userRolesRepository.findOne({
        where: { userId: user.id },
      });
      const returnUserObject = await this.rolesRepository.findOne({
        where: { id: rolesUser.roleId },
      });

      return { user, role: returnUserObject };
    } else {
      throw new BadRequestException('Укажите логин и(или) пароль');
    }
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user ? user : new NotFoundException('Пользователь не найден');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(_id: number) {
    const existsUser = await this.userRepository.findOne({
      where: { id: _id },
    });
    if (existsUser?.id) {
      await this.userRepository.destroy({ where: { id: _id } });
      return `Пользователь с id ${_id} успешно удален`;
    } else {
      throw new ConflictException('Такого пользователя не существует');
    }
  }
}
