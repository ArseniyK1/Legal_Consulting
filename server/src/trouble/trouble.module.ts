import { Module } from '@nestjs/common';
import { TroubleService } from './trouble.service';
import { TroubleController } from './trouble.controller';

@Module({
  controllers: [TroubleController],
  providers: [TroubleService],
})
export class TroubleModule {}
