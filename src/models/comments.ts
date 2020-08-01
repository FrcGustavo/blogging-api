import mongoose from 'mongoose';

const { Schema } = mongoose;

const commmentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
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
}, {
    timestamps: true,
});

const Comment = mongoose.model('comments', commmentSchema);

export default Comment;