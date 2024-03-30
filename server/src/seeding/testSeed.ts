// import { ConnectionOptions, createConnection, QueryRunner } from 'typeorm';
//
// import { DevSeed } from './DevSeed';
//
// createConnection(config.typeOrmConfig as ConnectionOptions).then(
//   async (connection) => {
//     let queryRunner = connection.createQueryRunner('master');
//
//     // runs all seed SQL commands in this function.
//     await DevSeed(queryRunner);
//
//     await queryRunner.release();
//     return connection.close();
//   },
// );
