import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { EnumConfig } from './enumConfig/enumConfig';

export const pgConfig = registerAs(EnumConfig.DATABASE, () => {
  return {
    dialect: <Dialect>process.env.SQL_DIALECT || 'postgres',
    loging: process.env.SQL_LOGGING === 'true' ? true : false,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: true,
  };
});
