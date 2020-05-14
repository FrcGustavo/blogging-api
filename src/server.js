const app = require('./index');
const connectMongo = require('./databases/mongoose');
const config = require('./config');
const { info } = require('./utils/debug');

app.listen(config.srv.port, async () => {
  await connectMongo();
  info(`Server is runing http:localhost:${config.srv.port}`);
});
