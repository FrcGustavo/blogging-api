import {
  PollsServiceContract,
  QueryPollsList,
  PollEntityContract,
  UpdatePollItem,
  CreatePollItem,
} from './types';

export class PollsService implements PollsServiceContract {
  constructor(private entity: PollEntityContract) {}

  async getAllPolls(query: QueryPollsList) {
    const limit = Number(query.limit) || 24;
    const offset = ((Number(query.page) || 1) - 1) * limit;
    const polls = await this.entity.findAll({ limit, offset });

    return polls;
  }

  async getOnePoll(uuid: string) {
    const poll = await this.entity.findOne(uuid);

    return poll;
  }

  async createPoll({ title, questions }: Partial<CreatePollItem>) {
    if (!title) {
      throw new Error('the title is requred');
    }

    if (!questions) {
      throw new Error('the questions is requred');
    }

    const createdPoll = this.entity.create({ title, questions });

    return createdPoll;
  }

  async updatePoll(uuid: string, { title, questions }: UpdatePollItem) {
    const poll = { title, questions };
    if (typeof title === 'undefined') {
      delete poll.title;
    }

    if (typeof questions === 'undefined') {
      delete poll.questions;
    }

    const updatedPoll = await this.entity.update(uuid, poll);

    return updatedPoll;
  }

  async deletePoll(uuid: string) {
    await this.entity.delete(uuid);

    return { isDeleted: true };
  }
}
