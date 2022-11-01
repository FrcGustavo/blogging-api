import mongoose from 'mongoose';

interface IPoll {
  title: string;
}

const PollSchema = new mongoose.Schema<IPoll>({
  title: String,
});

export const Polls = mongoose.model<IPoll>('polls', PollSchema);
