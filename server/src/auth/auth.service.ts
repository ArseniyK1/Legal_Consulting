import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { login: username },
      relations: { roleId: true },
    });
    if (!user?.id)
      throw new NotFoundException('Такого пользователя не существует!');
    const areEqual = await compare(pass.toString(), user.password.toString());
    if (!areEqual) {
      throw new UnauthorizedException();
    }
    const role = await this.rolesService.getRoleByid(+user.roleId.id);
    const payload = {
      userId: user.id,
      username: user.login,
      role: role.value,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(req: any) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.userId },
      relations: { roleId: true },
    });
    return user;
  }
}
