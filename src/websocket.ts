import { Server as HttpServer } from 'http';
import { Server } from 'ws';
import setupReactflowSocket from './components/reactflow';

class Websocket {
  private wss;

  constructor({ server }: { server: HttpServer }) {
    this.wss = new Server({ server });

    this.wss.on('connection', (ws, req) => {
      if (req.url === '/reactflow' || req.url === '/reactflow/') {
        setupReactflowSocket({ ws, req });
      } else {
        ws.close();
      }
    });
  }

  getIntance() {
    return this.wss;
  }
}

export default Websocket;
