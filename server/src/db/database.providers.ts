import { Sequelize } from 'sequelize-typescript';
import * as process from 'process';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Case } from '../case/entities/case.entity';
import { Trouble } from '../trouble/entities/trouble.entity';
import { Decision } from '../decision/entities/decision.entity';
import { Request } from '../request/entities/request.entity';
import { Discount } from '../discount/entities/discount.entity';
import { Feedback } from '../feedback/entities/feedback.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: String(process.env.POSTGRES_HOST),
        port: +process.env.POSTGRES_PORT,
        username: String(process.env.POSTGRES_USER),
        password: String(process.env.POSTGRES_PASSWORD),
        database: String(process.env.POSTGRES_DB),
      });
      sequelize.addModels([
        User,
        Roles,
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
