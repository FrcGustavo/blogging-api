import { UserEntityContract, UserItem } from './types';

const User = {
  uid: '',
  title: '',
  isPublic: false,
};

const Users = new Array(24).fill(User);

export class UserEntity implements UserEntityContract {
  async findAll() {
    return Users;
  }

  async create(user: UserItem) {
    return user;
  }
  // async findAll() {
  //   return POSTS;
  // }

  // async findOne() {
  //   return POSTS[0];
  // }

  // async create(post: PostItem) {
  //   POSTS.push(post);
  //   return POSTS[POSTS.length - 1];
  // }

  // async update() {
  //   return true;
  // }

  // async delete() {
  //   return false;
  // }
}
