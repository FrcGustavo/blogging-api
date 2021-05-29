/* eslint no-underscore-dangle: off */
import bcrypt from 'bcrypt';

export default class UsersService {
  private model: any;

  private validParams: any;

  private requireParams: any;

  private validFields: string[];

  private requireFields: string[];

  constructor(model: any, helpers: any) {
    this.model = model;
    this.validParams = helpers.validParams;
    this.requireParams = helpers.requireParams;
    this.requireFields = ['firstName', 'email', 'password'];
    this.validFields = [...this.requireFields, 'cover'];
  }

  async findUser(email: string) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async createUser(user: any) {
    // const filterFiledsUser = this.validParams(this.validFields, user);
    // const validUser = this.requireParams(this.requireFields, filterFiledsUser);

    const existedUser = await this.model.findOne({ email: user.email });
    if (existedUser) {
      throw new Error('error to create user');
    }

    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.model.create({
      ...user,
      password: hashedPassword,
    });

    return createdUser._id;
  }

  async getUser(userId: string) {
    const user = await this.model.findOne(
      { _id: userId, isDisabled: false },
      'firstName cover'
    );
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  async update(userId: string, user: object) {
    const validUser = this.validParams(this.validFields, user);

    const updatedUser = await this.model.updateOne(
      { _id: userId, isDisabled: false },
      validUser
    );
    if (updatedUser.nModified !== 1) {
      throw new Error('error to update user');
    }

    return userId;
  }

  async destroy(userId: string) {
    const user = await this.model.updateOne(
      { _id: userId, isDisabled: false },
      { isDisabled: true }
    );
    if (user.nModified !== 1) {
      throw new Error('error to delete user');
    }
    return userId;
  }
}
