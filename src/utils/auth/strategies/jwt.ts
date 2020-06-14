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
        const { _id: id, firstName, lastName, username, cover, email } = user;

        cb(null, { id, firstName, lastName, username, cover, email });
      } catch (err) {
        return cb(err)
      }
    }
  )
);