import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    if (!!createUserDto.password && !!createUserDto.login) {
      const existsUser = await this.userRepository.findOne({
        where: { login: createUserDto?.login },
      });
      if (existsUser?.id)
        throw new ConflictException('Такой пользователь уже существует');
      const user = await this.userRepository.create(createUserDto);
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

  async update(_id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const user = await this.userRepository.update(
      {
        first_name: updateUserDto.first_name,
        second_name: updateUserDto.second_name,
        middle_name: updateUserDto.middle_name,
        phonenumber: updateUserDto.phonenumber,
        photo: updateUserDto.photo,
        date_of_birth: updateUserDto.date_of_birth,
        contact_email: updateUserDto.contact_email,
      },
      {
        where: {
          id: _id,
        },
      },
    );

    return user;
  }
  //
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
    const returnUserObject = await this.rolesRepository.findOne({
      where: { id: rolesUser.roleId },
    });

    return returnUserObject;
  }
}
