import app from './index';
import connectMongo from './databases/mongoose';
import config from './config';
import { info } from './utils/debug';

app.listen(config.srv.port, async () => {
	await connectMongo();
	info(`Server is runing http:localhost:${config.srv.port}`);
});
