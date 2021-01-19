import { Router } from 'express';
import { Post } from '../../../models/posts';
import { UsersService } from './service';
import { UsersController } from './controller';
import { UsersRouter } from './router';

export const Users = (router: Router) => {
  const service: UsersService = new UsersService(Post);
  const controller: UsersController = new UsersController(service);
  new UsersRouter(router ,controller);
}