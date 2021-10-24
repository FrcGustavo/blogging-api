import { Options } from 'sequelize';

export type DatabaseConfig = Options & { setup: boolean };
