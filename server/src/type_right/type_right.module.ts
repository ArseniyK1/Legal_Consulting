import { Module } from '@nestjs/common';
import { TypeRightService } from './type_right.service';
import { TypeRightController } from './type_right.controller';
import { providers } from '../constants';
import { databaseProviders } from '../db/database.providers';

@Module({
  controllers: [TypeRightController],
  providers: [TypeRightService, ...providers, ...databaseProviders],
})
export class TypeRightModule {}
