import jwt from 'jsonwebtoken';
import config from '../../config';

const decodeJWT = (payload: string) =>
  jwt.verify(payload, config.srv.secretJWT);

export default decodeJWT;
