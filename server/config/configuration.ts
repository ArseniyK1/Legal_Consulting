import * as process from 'process';

export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 5000,
  DB: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'diplom_v1',
    user: process.env.POSTGRES_USER || 'postgres',
    username: process.env.POSTGRES_USER || 'postgres', // для Sequelize
    password: process.env.POSTGRES_PASSWORD || 'root',
  },
  LOGGER: {
    print_req_body: true, // писать в логи тело запроса
    log_err_stack: true, // логировать стэк ошибок или только сообщение
    DEBUG: true, //
    duration_DB_request: 300, // время выполнения запроса к БД при, превышении которого логировать запросы, мс
  },
  // REDIS: {
  //   host: process.env.POSTGRES_HOST || '10.3.0.36',
  //   port: +process.env.REDIS_PORT || 6379,
  //   retryAttempts: +process.env.REDIS_RETRY_ATEMPTS || Infinity,
  //   retryDelay: +process.env.REDIS_RETRY_DELAY || 1000,
  //   // для разработки, чтобы использовать один редис одновременно разными разработчиками
  //   queryPrefix:
  //     process.env.NODE_ENV === 'development' ? process.env.USERNAME + '_' : '', // префикс для очередей в редис
  // },
});
