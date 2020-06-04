import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('users', userSchema);

export default User;
