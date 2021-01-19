import { Model } from 'mongoose';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination  } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

export class UsersService {
  constructor(
    private model: Model<IPost>,
  ) {}

  async findAll(queries: any) {  
    const {
			limit,
			skip,
			sort,
			page,
    } = setupPagination(queries);

    const filters = { isDisabled: false };
		const posts = await find(this.model, filters, limit, sort, skip);
		const pagination = await toDoPagination(this.model, { limit, page }, filters);
  
    const emptyPosts = posts.map(({_id, title, cover, description, slug, en	}: any) => ({
      id: _id,
      title,
      cover,
      description,
      slug,
      en: en ? {
        title: en.title,
        cover: en.cover,
        description: en.description,
        slug: en.slug,
      } : null
    }));

    return {
      posts: emptyPosts,
      pagination
    };
  }

  async insert(post: any, author: any) {
		const {
			id: user,
			cover: userCover,
			username,
    } = author;

    const createdPost = await this.model.create({
      user,
			userCover,
			username,
      ...post,
    });

    return createdPost;
  }

  async update(id: string, post: any, authorId: string): Promise<boolean> {
    const updatedPost = await this.model.updateOne({ _id: id, isDisabled: false, user: authorId }, post);

		if (updatedPost.nModified !== 1) {
			throw new Error('error to update post');
		}

		return false;
  };
  
  async destroy(id: string, authorId: string): Promise<boolean> {
		if (id === '') { throw new Error('field id is required'); }

		const deletedPost = await this.model.updateOne({ _id: id, isDisabled: false, user: authorId, }, { isDisabled: true });

		if (deletedPost.nModified !== 1) {
			throw new Error('error to delete post');
		}

		return false;
	};

}