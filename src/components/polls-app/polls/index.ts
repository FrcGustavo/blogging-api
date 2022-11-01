import { Router } from 'express';
import { PollEntity } from './entity';
import { PollsService } from './service';
import { PollsController } from './controller';
import { PollsRouter } from './router';

export const Polls = (router: Router) => {
  const entity = new PollEntity();
  const service: PollsService = new PollsService(entity);
  const controller: PollsController = new PollsController(service);
  new PollsRouter(router, controller);
};
