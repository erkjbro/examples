import express, { Express } from 'express';
import http from 'http';
import { Server } from 'typescript-rest';

import { EventsController } from './controllers/events';
import { MongoConnector } from './mongo-connector';

export class APIServer {
  private static app: Express;
  private static server: http.Server;

  public static async start() {
    await MongoConnector.connect();

    APIServer.app = express();
    const port = process.env.PORT || 8000;
    Server.buildServices(APIServer.app, EventsController);

    APIServer.server = APIServer.app.listen(port, () => {
      console.log(`Server started at https://localhost:${port}`);
    });
  }

  public static async stop() {
    await APIServer.server.close();
    await MongoConnector.disconnect();
  }
}
