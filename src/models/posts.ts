import mongoose from 'mongoose';

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
  title: {
    type: String,
    required: true,
  },
  cover: {
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
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
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
}, {
  timestamps: true,
});

const Post = mongoose.model('posts', postSchema);

export default Post;
