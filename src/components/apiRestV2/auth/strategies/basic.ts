import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../users/entity';
import { UsersService } from '../../users/service';

passport.use(
  new BasicStrategy(async (email: string, password: string, cb: any) => {
    const entity = new UserEntity();
    const service = new UsersService(entity);
    try {
      const user = await service.getOneUserByEmail(email);

      if (!user) {
        return cb(new Error('User not found'));
      }

      const isValidPassword = bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return cb(new Error('Unauthorized'));
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
