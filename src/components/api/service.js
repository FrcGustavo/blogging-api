const bcrypt = require('bcrypt');
const buildParams = require('../../utils/buildParams');

const validUserParams = (user) => {
  const validAndRequireParams = ['firstName', 'email', 'password', 'repeatPassword'];
  const params = buildParams(validAndRequireParams, user);

  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined || params[key] === '') throw new Error('All params is required');
  });

  return params;
};

const isPasswordEqual = (user) => (user.password === user.repeatPassword);

const create = async (user) => {
  const validatedUser = validUserParams(user);

  if (!isPasswordEqual(validatedUser)) {
    throw new Error('the password are not equal');
  }

  const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

  const createdUser = {
    ...validatedUser,
    password: hashedPassword,
  };

  return createdUser;
};

module.exports = {
  create,
};
