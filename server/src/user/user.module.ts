import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';

@Module({
  imports: [RolesModule],
  controllers: [UserController],
  providers: [UserService, ...providers, ...databaseProviders],
  exports: [UserService],
})
export class UserModule {}
