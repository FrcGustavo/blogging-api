import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
  name: String,
});

export const Polls = mongoose.model('polls', PollSchema);
