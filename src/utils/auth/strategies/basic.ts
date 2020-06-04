import passport from 'passport';
import { BasicStrategy  } from 'passport-http';
import bcrypt from 'bcrypt';
import UsersService from '../../../components/users/service';
import User from '../../../models/user';

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const service = new UsersService(User);
    try {
      const user = await service.findUser({ email });

      if (!user) {
        return cb(new Error('Unauthorized'), false);
      }

      if(!(await bcrypt.compare(password, user.password))) {
        return cb(new Error('Unauthorized'), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }),
);