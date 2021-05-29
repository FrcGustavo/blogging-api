import { Model } from 'mongoose';
import showdown from 'showdown';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

export class PostsService {
  private converter = new showdown.Converter();

  constructor(private model: Model<IPost>) {}

  async findAll(queries: any) {
    const { lang } = queries;
    const { limit, page, skip, sort } = setupPagination(queries);

    const filters = { isPublic: true, isDisabled: false };
    const posts = await find(this.model, filters, limit, sort, skip);
    const pagination = await toDoPagination(
      this.model,
      { limit, page },
      filters
    );

    const emptyPosts = posts.map(({ _id, cover, slug, es, en }: any) => {
      const isEnglish = lang === 'en' && en !== null;
      return {
        id: _id,
        cover,
        slug,
        title: isEnglish ? en.title : es.title,
        description: isEnglish ? en.description : es.description,
      };
    });
    return {
      posts: emptyPosts,
      pagination,
    };
  }

  async findBySlug(slug: string, lang: string): Promise<any> {
    const filters = { slug, isPublic: true, isDisabled: false };
    const post: any = await this.model.findOne(filters);

    if (!post) {
      throw new Error(`the resource ${slug} not found`);
    }

    const { _id, user, userCover, username, cover, createdAt, en, es } = post;
    const isEnglish = lang === 'en' && en !== null;
    const html = this.converter.makeHtml(isEnglish ? en.body : es.body);

    return {
      id: _id,
      user,
      userCover,
      username,
      title: isEnglish ? en.title : es.title,
      cover,
      body: html,
      description: isEnglish ? en.description : es.description,
      keywords: isEnglish ? en.keywords : es.keywords,
      createdAt,
    };
  }
}
