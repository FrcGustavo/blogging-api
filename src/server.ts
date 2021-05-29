import config from './config';
import App from './app';

const app = new App();
const server = app.getIntance();

server.listen(config.srv.port, async () => {
	console.log(`Server is runing http:localhost:${config.srv.port}`);
});
