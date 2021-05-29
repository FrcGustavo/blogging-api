import config from './config';
import ROUTER from './router';
import App from './app';

const app = new App().getIntance();
const server = app;

ROUTER(app);

server.listen(config.srv.port, async () => {
	console.log(`Server is runing http:localhost:${config.srv.port}`);
});
