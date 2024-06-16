import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RolesModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, ...providers, ...databaseProviders],
  exports: [UserService],
})
export class UserModule {}
