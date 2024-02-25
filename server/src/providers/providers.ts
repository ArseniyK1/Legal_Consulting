import { User } from '../user/entities/user.entity';
import { UserRoles } from '../user/entities/UserRoles.entity';
import { Roles } from '../roles/entities/roles.entity';

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
];
