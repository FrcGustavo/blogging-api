import { Request, Response, NextFunction } from 'express';
import success from '../../../router/success';
import {
  PollsControllerContract,
  PollsServiceContract,
  QueryPollsList,
} from './types';

export class PollsController implements PollsControllerContract {
  constructor(private service: PollsServiceContract) {
    this.getAllPolls = this.getAllPolls.bind(this);
    this.createPoll = this.createPoll.bind(this);
    this.getOnePoll = this.getOnePoll.bind(this);
    this.updatePoll = this.updatePoll.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }

  async getAllPolls(
    req: Request<{}, {}, {}, QueryPollsList>,
    res: Response,
    next: NextFunction
  ) {
    const { query } = req;
    try {
      const listPolls = await this.service.getAllPolls(query);
      success({ res, data: listPolls });
    } catch (error) {
      next(error);
    }
  }

  async createPoll(req: Request, res: Response, next: NextFunction) {
    const { title, questions } = req.body;

    try {
      const createdPoll = await this.service.createPoll({ title, questions });
      success({ res, status: 201, data: createdPoll });
    } catch (error) {
      next(error);
    }
  }

  async getOnePoll(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    try {
      const retrievedPoll = await this.service.getOnePoll(uuid);
      success({ res, data: retrievedPoll });
    } catch (error) {
      next(error);
    }
  }

  async updatePoll(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const { title, questions } = req.body;
    try {
      const updatedPoll = await this.service.updatePoll(uuid, {
        title,
        questions,
      });
      success({ res, data: updatedPoll });
    } catch (error) {
      next(error);
    }
  }

  async deletePoll(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    try {
      const deletedPoll = await this.service.deletePoll(uuid);
      success({ res, data: deletedPoll });
    } catch (error) {
      next(error);
    }
  }
}
