import { Module } from '@nestjs/common';
import { TypeRightService } from './type_right.service';
import { TypeRightController } from './type_right.controller';

@Module({
  controllers: [TypeRightController],
  providers: [TypeRightService],
})
export class TypeRightModule {}
