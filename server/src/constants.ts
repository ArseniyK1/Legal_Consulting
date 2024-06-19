import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { Case } from './case/entities/case.entity';
import { Request } from './request/entities/request.entity';
import { TypeRight } from './type_right/entities/type_right.entity';
import { Organization } from './organization/entities/organization.entity';

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
    provide: 'CASE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Case),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'REQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Request),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TYPE_RIGHT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TypeRight),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORGANIZATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Organization),
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
  DONE = 'done',
  CANCELED = 'canceled',
} // pending - ожидает привязки юриста (самим юристом или оператором), accepted - принята юристом, done - в процессе, canceled - отменен
