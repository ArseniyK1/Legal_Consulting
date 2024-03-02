import { forwardRef, Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { providers } from '../providers/providers';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, ...providers],
  exports: [PortfolioService],
})
export class PortfolioModule {}
