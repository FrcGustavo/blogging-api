import mongoose, { Types } from 'mongoose';

interface IAnswer {
  _id: Types.ObjectId;
  answer: string;
}

interface IQuestion {
  _id: Types.ObjectId;
  question: string;
  typeQuestion: string;
  answers: IAnswer[];
}

interface IPoll {
  title: string;
  questions: IQuestion[];
}

const AnswerSchema = new mongoose.Schema<IAnswer>({
  answer: String,
});

const QuestionSchema = new mongoose.Schema<IQuestion>({
  question: String,
  typeQuestion: String,
  answers: [AnswerSchema],
});

const PollSchema = new mongoose.Schema<IPoll>(
  {
    title: String,
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export const Polls = mongoose.model<IPoll>('polls', PollSchema);
