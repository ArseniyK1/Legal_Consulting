import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { providers } from '../providers/providers';
import { RolesModule } from '../roles/roles.module';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { PortfolioService } from '../portfolio/portfolio.service';

@Module({
  imports: [RolesModule, forwardRef(() => PortfolioModule)],
  controllers: [UserController],
  providers: [UserService, ...providers],
  exports: [UserService],
})
export class UserModule {}
