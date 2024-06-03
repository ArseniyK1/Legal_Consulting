import { DataSource } from 'typeorm';
import * as process from 'process';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: String(process.env.POSTGRES_HOST),
        port: +process.env.POSTGRES_PORT,
        username: String(process.env.POSTGRES_USER),
        password: String(process.env.POSTGRES_PASSWORD),
        database: String(process.env.POSTGRES_DB),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      });
      await dataSource.initialize();
      await dataSource.synchronize();
      //
      // for (const entity of dataSource.entityMetadatas) {
      //   if (
      //     entity.tableName !== 'roles' &&
      //     entity.tableName !== 'user' &&
      //     entity.tableName !== 'users' &&
      //     entity.tableName !== 'type_right' &&
      //     entity.tableName !== 'typeRight'
      //   )
      //     await dataSource
      //       .createQueryRunner()
      //       .query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
      // }

      return dataSource;
    },
  },
];
