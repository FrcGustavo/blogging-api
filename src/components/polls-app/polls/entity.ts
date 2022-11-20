/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import {
  PollEntityContract,
  PollItem,
  PollsList,
  UpdatePollItem,
  CreatePollItem,
} from './types';
import { Polls } from '../models';

export class PollEntity implements PollEntityContract {
  async findAll() {
    const polls = await Polls.find();
    const listPolls: PollsList = polls.map(({ id, title, questions }) => ({
      uuid: id,
      title,
      questions: questions.map((currentQuestion) => ({
        uuid: currentQuestion._id as unknown as string,
        question: currentQuestion.question,
        typeQuestion: currentQuestion.typeQuestion,
        answers: currentQuestion.answers.map((currentAnswer) => ({
          uuid: currentAnswer._id as unknown as string,
          answer: currentAnswer.answer,
        })),
      })),
    }));

    return listPolls;
  }

  async findOne(uuid: string) {
    const foundPoll = await Polls.findById(uuid);

    if (!foundPoll) {
      throw new Error('Post not found');
    }

    const poll: PollItem = {
      uuid: foundPoll.id,
      title: foundPoll.title,
      questions: foundPoll.questions.map((currentQuestion) => ({
        uuid: currentQuestion._id as unknown as string,
        question: currentQuestion.question,
        typeQuestion: currentQuestion.typeQuestion,
        answers: currentQuestion.answers.map((currentAnswer) => ({
          uuid: currentAnswer._id as unknown as string,
          answer: currentAnswer.answer,
        })),
      })),
    };

    return poll;
  }

  async create(poll: CreatePollItem) {
    const createdPoll = await Polls.create(poll);

    if (!createdPoll.id) {
      throw new Error('cant create a poll');
    }

    return {
      uuid: createdPoll.id as string,
      title: createdPoll.title,
      questions: createdPoll.questions.map((currentQuestion) => ({
        uuid: currentQuestion._id as unknown as string,
        question: currentQuestion.question,
        typeQuestion: currentQuestion.typeQuestion,
        answers: currentQuestion.answers.map((currentAnswer) => ({
          uuid: currentAnswer._id as unknown as string,
          answer: currentAnswer.answer,
        })),
      })),
    };
  }

  async update(uuid: string, poll: UpdatePollItem) {
    const UUIDv4 = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    const questions = poll.questions?.map(
      ({ uuid: questionUUID, question, typeQuestion, answers }) => ({
        _id: UUIDv4.test(questionUUID)
          ? new Types.ObjectId()
          : Types.ObjectId(questionUUID),
        question,
        typeQuestion,
        answers: answers.map(({ uuid: answerUUID, answer }) => ({
          _id: UUIDv4.test(answerUUID)
            ? new Types.ObjectId()
            : Types.ObjectId(answerUUID),
          answer,
        })),
      })
    );

    await Polls.findByIdAndUpdate(
      uuid,
      { title: poll.title, questions },
      { useFindAndModify: false }
    );

    const updatedPoll = await Polls.findById(uuid);

    if (!updatedPoll) {
      throw new Error('poll not found');
    }

    const pollItem: PollItem = {
      uuid: updatedPoll._id,
      title: updatedPoll.title,
      questions: updatedPoll.questions.map((question) => ({
        uuid: question._id.toString(),
        question: question.question,
        typeQuestion: question.typeQuestion,
        answers: question.answers.map((answer) => ({
          uuid: answer._id.toString(),
          answer: answer.answer,
        })),
      })),
    };

    return pollItem;
  }

  async delete(uuid: string) {
    await Polls.findByIdAndRemove(uuid);

    return true;
  }
}
