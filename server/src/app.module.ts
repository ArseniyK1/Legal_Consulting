import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { RequestModule } from './request/request.module';
import { CaseModule } from './case/case.module';
import { databaseProviders } from './db/database.providers';
import { DiscountModule } from './discount/discount.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrganizationModule } from './organization/organization.module';
import { TypeRightModule } from './type_right/type_right.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RolesModule,
    RequestModule,
    CaseModule,
    DiscountModule,
    FeedbackModule,
    AuthModule,
    OrganizationModule,
    TypeRightModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  controllers: [AppController],
})
export class AppModule {}
// export class AppModule implements OnApplicationBootstrap {
//   constructor(private readonly seedingService: SeedingService) {}
//
//   async onApplicationBootstrap(): Promise<void> {
//     await this.seedingService.seed();
//   }
// }
