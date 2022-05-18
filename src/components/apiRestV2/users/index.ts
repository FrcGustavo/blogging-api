import { Router } from 'express';
import { UserEntity } from './entity';
import { UsersService } from './service';
import { UsersController } from './controller';
import { UsersRouter } from './router';

export const Users = (router: Router) => {
  const entity = new UserEntity();
  const service: UsersService = new UsersService(entity);
  const controller: UsersController = new UsersController(service);
  new UsersRouter(router, controller);
};
