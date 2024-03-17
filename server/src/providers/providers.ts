import { User } from '../user/entities/user.entity';
import { UserRoles } from '../user/entities/UserRoles.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Case } from '../case/entities/case.entity';
import { Request } from '../request/entities/request.entity';

export const providers = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Roles,
  },
  {
    provide: 'USER_ROLES_REPOSITORY',
    useValue: UserRoles,
  },
  {
    provide: 'PORTFOLIO_REPOSITORY',
    useValue: Portfolio,
  },
  {
    provide: 'CASE_REPOSITORY',
    useValue: Case,
  },
  {
    provide: 'REQUEST_REPOSITORY',
    useValue: Request,
  },
];
