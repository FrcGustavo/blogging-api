import { Model } from 'mongoose';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination  } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

export class PostsService {
  constructor(
    private model: Model<IPost>,
  ) {}

  async findAll(queries: any) {
    const lang = queries.lang ? queries.lang : 'es';
    const {
      limit,
      page,
      skip,
      sort
    } = setupPagination(queries);
    
    const filters = { isDisabled: false };
    const posts = await find(this.model, filters, limit, sort, skip);
    const pagination = await toDoPagination(this.model, { limit, page }, filters);

    const emptyPosts = posts.map(({ _id, title, cover, description, slug, en }: any) => {
      if (lang === 'en' && en !== null) {
        return {
          id: _id,
          title: en.title,
          cover: en.cover,
          description: en.description,
          slug: en.slug
        }
      }
      
      return { id: _id, title, cover, description, slug };
    });
    return {
      posts: emptyPosts,
      pagination,
    }
  }
}