import { PostEntityContract } from './types';

export class PostEntity implements PostEntityContract {
  async findAll() {
    return [
      {
        uid: '',
        title: '',
        isPublic: false,
      },
    ];
  }

  async findOne() {}
}
