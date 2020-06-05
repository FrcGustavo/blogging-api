import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import requireParams from '../../params/requireParams';
import validParams from '../../params/validParams';
import UserService from '../../../components/users/service';
import User from '../../../models/user';
import config from '../../../config';


passport.use(
  new Strategy(
    {
      secretOrKey: config.srv.secretJWT,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload: any, cb: any) => {
      const service = new UserService(User, { requireParams, validParams });

      try {
        const user = await service.findUser(tokenPayload.email);

        if(!user) {
          return cb(new Error(), false);
        }
        delete user.password;

        cb(null, { ...user });
      } catch (err) {
        return cb(err)
      }
    }
  )
);