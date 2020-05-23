import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import buildParams from '../../utils/params/validParams';
import config from '../../config';

/**
 * Valid the params of user
 * @param {*} user
 */
const validUserParams = (user: any) => {
  const validAndRequireParams = ['firstName', 'email', 'password', 'repeatPassword'];
  const params = buildParams(validAndRequireParams, user);

  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined || params[key] === '') throw new Error('All params is required');
  });

  return params;
};

/**
 * Valid that password and repeat password are equal
 * @param {*} user
 */
const isPasswordEqual = (user: any) => (user.password === user.repeatPassword);

/**
 * Create a new user
 * @param {*} user
 */
export const create = async (user: any) => {
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

/**
 * Make login to one user and return a jwt
 * @param {*} user
 */
export const logged = async (user: any) => {
  const { email, password } = user;
  const existedUser: any = await User.findOne({ email });

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

  const token = jwt.sign(payload, config.srv.secretJWT, {
    expiresIn: '59min',
  });

  return token;
};
