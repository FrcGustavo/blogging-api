const app = require('./index');
const config = require('./config');
const { info } = require('./utils/debug');

app.listen(config.srv.port, () => {
  info(`Server is runing http:localhost:${config.srv.port}`);
});
