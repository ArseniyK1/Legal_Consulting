import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { providers } from '../providers/providers';

@Module({
  imports: [],
  controllers: [RequestController],
  providers: [RequestService, ...providers],
  exports: [RequestService],
})
export class RequestModule {}
