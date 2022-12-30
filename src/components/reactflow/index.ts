import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

const { setupWSConnection } = require('y-websocket/bin/utils');

const setupReactflowSocket = ({
  ws,
  req,
}: {
  ws: WebSocket;
  req: IncomingMessage;
}): void => {
  setupWSConnection(ws, req);
};

export default setupReactflowSocket;
