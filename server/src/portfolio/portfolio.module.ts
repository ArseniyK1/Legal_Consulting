import { forwardRef, Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { CaseModule } from 'src/case/case.module';
import { providers } from '../constants';
import { DatabaseModule } from '../db/database.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, ...providers],
  exports: [PortfolioService],
  imports: [forwardRef(() => CaseModule), DatabaseModule],
})
export class PortfolioModule {}
