import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...providers],
  exports: [RolesService],
  imports: [DatabaseModule],
})
export class RolesModule {}
