import { Model } from 'mongoose';
import showdown from 'showdown';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination  } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

export class PostsService {
  private converter = new showdown.Converter();

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
    
    const filters = { isPublic: true, isDisabled: false };
    const posts = await find(this.model, filters, limit, sort, skip);
    const pagination = await toDoPagination(this.model, { limit, page }, filters);

    const emptyPosts = posts.map(({ _id, title, cover, description, slug, en }: any) => {
      if (lang === 'en' && en !== null) {
        return {
          id: _id,
          title: en.title,
          cover: en.cover,
          description: en.description,
          slug,
        }
      }
      
      return { id: _id, title, cover, description, slug };
    });
    return {
      posts: emptyPosts,
      pagination,
    }
  }

  async findBySlug(slug: string, lang: string): Promise<any> {
    const filters = { slug, isPublic: true, isDisabled: false };
    const post: any = await this.model.findOne(filters);
    
    if (!post) {
      throw new Error(`the resource ${slug} not found`);
		}
    
    const {
      _id,
			user,
			userCover,
			username,
			title,
			cover,
			body,
			description,
      keywords,
			views,
			timeShared,
			likes,
			createdAt,
      en
    } = post;
    const isEnglish = (lang === 'en' && en !== null);
    const html = this.converter.makeHtml(isEnglish ? en.body : body);
    
    return {
      id: _id,
			user,
			userCover,
			username,
			title: isEnglish ? en.title : title,
			cover: isEnglish ? en.cover : cover,
			body: html,
			description: isEnglish ? en.description : description,
      keywords: isEnglish ? en.keywords : keywords,
			views,
			timeShared,
			likes,
      createdAt,
    };
  }
}