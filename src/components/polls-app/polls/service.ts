import { v4 } from 'uuid';
import {
  PollsList,
  PollsServiceContract,
  QueryPollsList,
  // PostEntityContract,
  UpdatePollItem,
  CreatePollItem,
} from './types';

export class PollsService implements PollsServiceContract {
  private polls: PollsList = [];

  // constructor(private entity: PostEntityContract) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  async getAllPolls(query: QueryPollsList) {
    return this.polls;
  }

  async getOnePoll(uuid: string) {
    const poll = this.polls.find((currentPoll) => currentPoll.uuid === uuid);

    if (!poll) {
      throw new Error('the polls is not found');
    }

    return poll;
  }

  async createPoll({ title, questions }: Partial<CreatePollItem>) {
    if (!title) {
      throw new Error('the title is requred');
    }

    if (!questions) {
      throw new Error('the questions is requred');
    }

    const createdPoll = { uuid: v4(), title, questions };

    this.polls.push(createdPoll);

    return createdPoll.uuid;
  }

  async updatePoll(uuid: string, { title, questions }: UpdatePollItem) {
    const poll = { title, questions };
    if (typeof title === 'undefined') {
      delete poll.title;
    }

    if (typeof questions === 'undefined') {
      delete poll.questions;
    }

    // const isUpdated
    this.polls = this.polls.map((currentPoll) => {
      if (currentPoll.uuid === uuid) {
        const newPoll = { ...currentPoll };

        if (poll.title) {
          newPoll.title = poll.title;
        }

        if (poll.questions) {
          newPoll.questions = poll.questions;
        }

        return newPoll;
      }

      return currentPoll;
    });
    return { isUpdated: true };
  }

  async deletePoll(uuid: string) {
    // const isDeleted =
    this.polls = this.polls.filter((currentPoll) => currentPoll.uuid !== uuid);
    return { isDeleted: true };
  }
}