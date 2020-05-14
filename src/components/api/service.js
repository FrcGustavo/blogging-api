const bcrypt = require('bcrypt');
const User = require('../../models/user');
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

  const existedUser = await User.findOne({ email: user.email });

  if (existedUser) throw new Error('resource true exists');

  const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

  const { firstName, email } = validatedUser;
  const createdUser = await User.create({
    firstName,
    email,
    password: hashedPassword,
  });

  return createdUser;
};

const logged = async (user) => {
  const { email, password } = user;
  const existedUser = await User.findOne({ email });

  if (!existedUser) throw new Error('Please write correct credentials');

  const isValidPassword = await bcrypt.compare(password, existedUser.password);

  if (!isValidPassword) throw new Error('Please write correct credentials');

  delete existedUser.password;

  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    sub: existedUser._id,
    email: existedUser.email,
    firstName: existedUser.firstName,
  };

  return payload;
};

module.exports = {
  create,
  logged,
};
