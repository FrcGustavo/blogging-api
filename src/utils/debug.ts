import debug from 'debug';
import config from '../config';

export const info = debug(`${config.srv.logPrefix}:info`);
export const dev = debug(`${config.srv.logPrefix}:dev`);
export const error = debug(`${config.srv.logPrefix}:error`);