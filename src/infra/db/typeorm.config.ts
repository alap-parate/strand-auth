import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dataBaseConfig from '../../config/configurations/db.config';

const db = dataBaseConfig();

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.userName,
  password: db.password,
  ssl: db.ssl ? { rejectUnauthorized: false } : false,
  database: db.name,
  schema: db.schema,

  entities: ['src/**/*.entity.{ts}'],
  autoLoadEntities: true,
  migrations: ['src/core/database/migrations/*.{ts}'],
  migrationsRun: false,
  migrationsTransactionMode: 'all',

  retryAttempts: db.retryAttempts,
  retryDelay: db.retryDelay,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
