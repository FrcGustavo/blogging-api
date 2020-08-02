import mongoose from 'mongoose';

const { Schema } = mongoose;

const commmentSchema = new Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'posts',
        required: true,
    },
    username: {
        type: String,
        default: 'anonimo',
    },
    body: {
        type: String,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Comment = mongoose.model('comments', commmentSchema);

export default Comment;