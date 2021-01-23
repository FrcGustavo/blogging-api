import { Model } from 'mongoose';
import showdown from 'showdown';
import { IPost } from '../../../models/posts';
import setupPagination from '../../../utils/pagination/setupPagination';
import { toDoPagination  } from '../../../utils/pagination/toDoPagination';
import { find } from '../../../utils/pagination/findWithPagination';

export class UsersService {
  private converter = new showdown.Converter();
	
  constructor(
    private model: Model<IPost>,
  ) {}

  async findOnePost(id: string, lang: any): Promise<any> {
    const filters = { _id: id, isDisabled: false };
    const post: any = await this.model.findOne(filters);
    
    const {
      _id,
			user,
			userCover,
			username,
			cover,
			createdAt,
      en,
      es
    } = post;
    const isEnglish = (lang === 'en' && en !== null);
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

  async findAll(queries: any): Promise<any> {  
    const {
			limit,
			skip,
			sort,
			page,
    } = setupPagination(queries);

    const filters = { isDisabled: false };
		const posts = await find(this.model, filters, limit, sort, skip);
		const pagination = await toDoPagination(this.model, { limit, page }, filters);

    return {
      posts: posts,
      pagination
    };
  }

  async insert(post: any, author: any): Promise<any> {
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