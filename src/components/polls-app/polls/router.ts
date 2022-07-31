import { Router } from 'express';
import { PollsRouterContract, PollsControllerContract } from './types';

export class PollsRouter implements PollsRouterContract {
  constructor(
    private router: Router,
    private controller: PollsControllerContract
  ) {
    this.router
      .route('/polls')
      .get(this.controller.getAllPolls)
      .post(this.controller.createPoll);
    this.router
      .route('/polls/:uuid')
      .get(this.controller.getOnePoll)
      .put(this.controller.updatePoll)
      .delete(this.controller.deletePoll);
  }
}
