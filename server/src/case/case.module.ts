import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CaseController],
  providers: [CaseService, ...providers],
  exports: [CaseService],
})
export class CaseModule {}
