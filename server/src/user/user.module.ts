import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { providers } from '../providers/providers';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [RolesModule],
  controllers: [UserController],
  providers: [UserService, ...providers],
  exports: [UserService],
})
export class UserModule {}
