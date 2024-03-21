import { forwardRef, Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { providers } from '../providers/providers';
import { CaseModule } from 'src/case/case.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, ...providers],
  exports: [PortfolioService],
  imports: [forwardRef(() => CaseModule)],
})
export class PortfolioModule {}
