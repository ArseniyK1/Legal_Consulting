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

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { login: username },
    });
    if (!user?.id)
      throw new NotFoundException('Такого пользователя не существует!');
    const areEqual = await compare(pass.toString(), user.password.toString());
    if (!areEqual) {
      throw new UnauthorizedException();
    }
    const role = await this.rolesService.getRoleByid(+user.roleId);
    const payload = {
      userId: user.id,
      username: user.login,
      verified: user.verified,
      banned: user.banned,
      role: role.value,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
//
