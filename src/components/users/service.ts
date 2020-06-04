export default class UsersService {

  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findUser(email: string) {
    const user = await this.model.findOne({ email });
    return user;
  }

}