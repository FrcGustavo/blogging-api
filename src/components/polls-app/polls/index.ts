import { Router } from 'express';
// import { PostEntity } from './entity';
import { PollsService } from './service';
import { PollsController } from './controller';
import { PollsRouter } from './router';

export const Polls = (router: Router) => {
  // const entity = new PostEntity();
  const service: PollsService = new PollsService();
  const controller: PollsController = new PollsController(service);
  new PollsRouter(router, controller);
};
