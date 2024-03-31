import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { RequestModule } from './request/request.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CaseModule } from './case/case.module';
import { databaseProviders } from './db/database.providers';
import { DiscountModule } from './discount/discount.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TroubleModule } from './trouble/trouble.module';
import { DecisionModule } from './decision/decision.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './core/logger.middleware';
import { DatabaseModule } from './db/database.module';
import { EntityManager } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RolesModule,
    RequestModule,
    PortfolioModule,
    CaseModule,
    DiscountModule,
    FeedbackModule,
    TroubleModule,
    DecisionModule,
    AuthModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
// export class AppModule implements OnApplicationBootstrap {
//   constructor(private readonly seedingService: SeedingService) {}
//
//   async onApplicationBootstrap(): Promise<void> {
//     await this.seedingService.seed();
//   }
// }
