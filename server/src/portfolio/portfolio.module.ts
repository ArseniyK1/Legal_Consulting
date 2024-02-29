import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { providers } from '../providers/providers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, ...providers],
  exports: [PortfolioService],
})
export class PortfolioModule {}
