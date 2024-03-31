// import { Injectable, Logger } from '@nestjs/common';
// import { EntityManager } from 'typeorm';
//
// import { User } from '../user/entities/user.entity';
// import { Roles } from '../roles/entities/roles.entity';
// import { userseed } from '../../seeders/user.factory';
//
// @Injectable()
// export class SeedingService {
//   constructor(private readonly entityManager: EntityManager) {}
//
//   async seed(): Promise<void> {
//     // Replace with your own seeds
//     await Promise.all([this.entityManager.save(User, userseed)]);
//   }
// }
