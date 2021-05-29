import mongoose, { Document } from 'mongoose';

export interface IPostLang extends Document {
  title: string;
  body: string;
  description: string;
  keywords: string;
}

export interface IPost extends Document {
  user: string;
  userCover: string;
  username: string;
  cover: string;
  slug: string;
  isPublic: boolean;
  isDisabled: boolean;
  en: IPostLang;
  es: IPostLang;
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
};

const { Schema } = mongoose;

const postSchema = new Schema(
  {
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
    cover: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
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
      default: null,
    },
    es: {
      type: new Schema(handlePostSchema),
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<IPost>('posts', postSchema);

export default Post;
