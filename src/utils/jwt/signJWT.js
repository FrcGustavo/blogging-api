const jwt = require('jsonwebtoken');
const config = require('../../config');

const signJWT = (payload, time) => {
  const expiresIn = time || '15min';
  return jwt.sign(payload, config.srv.secretJWT, {
    expiresIn,
  });
};

module.exports = signJWT;
