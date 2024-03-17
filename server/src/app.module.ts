import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
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
