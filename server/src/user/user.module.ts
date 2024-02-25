import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { providers } from '../providers/providers';
import { DatabaseModule } from '../db/database.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [DatabaseModule, RolesModule], // DatabaseModule вроде не нужно импортировать
  controllers: [UserController],
  providers: [UserService, ...providers],
  exports: [UserService],
})
export class UserModule {}
