import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';
import { CaseService } from '../case/case.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RequestController],
  providers: [RequestService, ...providers, CaseService],
  exports: [RequestService],
})
export class RequestModule {}
