import jwt from 'jsonwebtoken';
import config from '../../config';

const signJWT = (payload: JSON, time: string) => {
  const expiresIn = time || '15min';
  return jwt.sign(payload, config.srv.secretJWT, {
    expiresIn,
  });
};

export default signJWT;
