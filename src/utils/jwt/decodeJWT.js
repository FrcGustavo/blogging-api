const jwt = require('jsonwebtoken');
const config = require('../../config');

const decodeJWT = (payload) => jwt.verify(payload, config.srv.secretJWT);

module.exports = decodeJWT;
