import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { login: username },
    });
    const areEqual = await compare(pass.toString(), user.password.toString());
    if (!areEqual) {
      throw new UnauthorizedException();
    }
    const { role } = await this.userService.findOne(user.id);
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
