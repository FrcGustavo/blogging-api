import mongoose, { Document } from 'mongoose';

export interface IPostEn extends Document {
	title: string;
	body: string;
	description: string;
	keywords: string;
}

export interface IPost extends Document {
	user: string;
	userCover: string;
	username: string;
	title: string;
	cover: string;
	body: string;
	description: string;
	keywords: string;
	slug: string;
	views: number;
	timeShared: number;
	likes: number;
	isPublic: boolean;
	isDisabled: boolean;
	en: IPostEn
}

export const handlePostSchema = {
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	keywords: {
		type: String,
		required: true,
	},
}

const { Schema } = mongoose;

const postSchema = new Schema({
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'users',
	},
	userCover: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	...handlePostSchema,
	views: {
		type: Number,
		default: 0,
	},
	timeShared: {
		type: Number,
		default: 0,
	},
	likes: {
		type: Number,
		default: 0,
	},
	isPublic: {
		type: Boolean,
		default: false,
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
	en: {
		type: new Schema(handlePostSchema),
		default: null
	}
}, {
	timestamps: true,
});

export const Post = mongoose.model<IPost>('posts', postSchema);

export default Post;
