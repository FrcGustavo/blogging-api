import { Model } from 'mongoose';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination  } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

type queries = {
  limit?: number;
  sort_name?: string;
  sort?: string;
  page?: number;
  lang?: string;
}

export class UsersService {
  constructor(
    private model: Model<IPost>,
  ) {}

  async findAll(queries: queries) {  
    const {
			limit,
			skip,
			sort,
			page,
    } = setupPagination(queries as any);

    const filters = { isDisabled: false };
		const posts = await find(this.model, filters, limit, sort, skip);
		const pagination = await toDoPagination(this.model, { limit, page }, filters);
  
    const emptyPosts = posts.map(({
			_id,
			title,
			cover,
			description,
      slug,
      en
		}: any) => {
      if (en !== null && queries.lang === 'en') {
        console.log(en);
        return {
          id: _id,
          title: en.title,
          cover: en.cover,
          description: en.description,
          slug: en.slug,
        }
      } else {
        return {
          id: _id,
          title,
          cover,
          description,
          slug
        }
      }
    });

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
      ...post
    });

    return createdPost;
  }

}