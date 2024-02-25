import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { providers } from '../providers/providers';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...providers],
  exports: [RolesService],
})
export class RolesModule {}
