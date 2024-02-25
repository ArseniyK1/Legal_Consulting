import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { providers } from '../providers/providers';
import { CaseModule } from '../case/case.module';

@Module({
  imports: [CaseModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, ...providers],
  exports: [PortfolioService],
})
export class PortfolioModule {}
