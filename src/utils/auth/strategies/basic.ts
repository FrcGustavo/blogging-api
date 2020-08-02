import passport from 'passport';
import { BasicStrategy  } from 'passport-http';
import requireParams from '../../params/requireParams';
import validParams from '../../params/validParams';
import bcrypt from 'bcrypt';
import UsersService from '../../../components/users/service';
import User from '../../../models/user';

passport.use(
	new BasicStrategy(async (email: string, password: string, cb: any) => {
		const service = new UsersService(User, { requireParams, validParams });
		try {
			const user = await service.findUser(email);

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