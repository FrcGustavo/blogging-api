import bcrypt from 'bcrypt';

export default class UsersService {

  private model: any;
  private validParams: any;
  private requireParams: any;
  private validFields: string[];

  constructor(model: any, helpers: any) {
    this.model = model;
    this.validParams = helpers.validParams;
    this.requireParams = helpers.requireParams;
    this.validFields = ['firstName', 'email', 'password'];
  }

  async findUser(email: string) {
    const user = await this.model.findOne({ email });
    return user;
  }

  async createUser(user: any) {
    const filterFiledsUser = this.validParams(this.validFields, user);
    const validUser = this.requireParams(this.validFields, filterFiledsUser);

    const existedUser = await this.model.findOne({ email: validUser.email });
    if(existedUser) throw new Error('error to create user');

    const { password } = validUser;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.model.create({ ...validUser, password: hashedPassword });

    return createdUser._id;
  }

  async getUser(userId: string) {
    const user = await this.model.findOne({ _id: userId, isDisabled: false }, 'firstName');
    if(!user) throw new Error('user not found');
    return user;
  }

  async destroy(userId: string) {
    const user = await this.model.updateOne({ _id: userId, isDisabled: false }, { isDisabled: true });
    if(user.nModified !== 1) throw new Error('error to delete user');
    return userId;
  }

}