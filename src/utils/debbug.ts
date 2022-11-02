import debug from 'debug';
import config from '../config';

export const app = debug(`${config.srv.logPrefix}:server`);
export const logger = debug(`${config.srv.logPrefix}:logger`);
export const postgres = debug(`${config.srv.logPrefix}:postgres`);
export const mongo = debug(`${config.srv.logPrefix}:mongo`);
