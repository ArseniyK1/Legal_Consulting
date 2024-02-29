import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { providers } from '../providers/providers';

@Module({
  imports: [PortfolioModule],
  controllers: [CaseController],
  providers: [CaseService, ...providers],
  exports: [CaseService],
})
export class CaseModule {}
