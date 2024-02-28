import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { providers } from '../providers/providers';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...providers],
  exports: [RolesService],
})
export class RolesModule {}
