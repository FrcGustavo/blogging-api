import dotenv from 'dotenv';

dotenv.config();

const config = {
	srv: {
		mode: process.env.NODE_ENV || 'development',
		port: process.env.PORT || 3000,
		logPrefix: process.env.LOG_PREFIX || 'app',
		secretSession: process.env.SECRET_SESSION || 'my_secret-key',
		secretJWT: process.env.SECRET_JTW || 'my_secret-key',
	},
	db: {
		host: process.env.DB_HOST || '',
		user: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
		name: process.env.DB_NAME || '',
	},
};

export default config;