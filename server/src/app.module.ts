import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/guards/roles.guard';

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
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
