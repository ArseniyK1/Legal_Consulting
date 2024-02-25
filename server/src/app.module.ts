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

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    UserModule,
    RolesModule,
    RequestModule,
    PortfolioModule,
    CaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
//
