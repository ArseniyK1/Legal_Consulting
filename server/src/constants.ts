import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { Case } from './case/entities/case.entity';
import { Request } from './request/entities/request.entity';

export const providers = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ROLES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Roles),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PORTFOLIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Portfolio),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CASE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Case),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'REQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Request),
    inject: ['DATA_SOURCE'],
  },
];

export enum roleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  LAWYER = 'LAWYER',
  OPERATOR = 'OPERATOR',
}

export enum requestStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'inProgress',
  CANCELED = 'canceled',
} // pending - ожидает ответа оператора, accepted - принят, inProgress - в процессе, canceled - отменен
