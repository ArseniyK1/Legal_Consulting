import { Sequelize } from 'sequelize-typescript';
import * as process from 'process';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { UserRoles } from '../user/entities/UserRoles.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Case } from '../case/entities/case.entity';
import { Trouble } from '../trouble/entities/trouble.entity';
import { Decision } from '../decision/entities/decision.entity';
import { Request } from '../request/entities/request.entity';
import { Discount } from '../discount/entities/discount.entity';
import { Feedback } from '../feedback/entities/feedback.entity';
// import { Role } from '../roles/entities/roles.entity';
// import { UserRoles } from '../intermediateModels/UserRoles.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      });
      sequelize.addModels([
        User,
        Roles,
        UserRoles,
        Portfolio,
        Case,
        Trouble,
        Decision,
        Request,
        Discount,
        Feedback,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
//
