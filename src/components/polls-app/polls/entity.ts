/* eslint-disable no-underscore-dangle */
import {
  PollEntityContract,
  PollItem,
  PollsList,
  // UpdatePostItem,
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

  // async update(uuid: string, data: UpdatePostItem) {
  //   const { Post } = await setupDatabaseBlog();
  //   const updatedPost = Post.updatePost(uuid, data);
  //   return updatedPost;
  // }
  // async delete(uuid: string) {
  //   const { Post } = await setupDatabaseBlog();
  //   const deletedPost = Post.deletePost(uuid);
  //   return deletedPost;
  // }
}
