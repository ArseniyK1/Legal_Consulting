import { forwardRef, Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [forwardRef(() => PortfolioModule), DatabaseModule],
  controllers: [CaseController],
  providers: [CaseService, ...providers],
  exports: [CaseService],
})
export class CaseModule {}
